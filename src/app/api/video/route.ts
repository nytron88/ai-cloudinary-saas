import { NextRequest } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { auth } from "@clerk/nextjs/server";
import { withLoggerAndErrorHandler } from "@/lib/withLoggerAndErrorHandler";
import { errorResponse, successResponse } from "@/lib/responseWrapper";
import { UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { VideoUploadResponse } from "@/types/video";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const POST = withLoggerAndErrorHandler(async (request: NextRequest) => {
  const { userId } = await auth();

  if (!userId) {
    return errorResponse("Unauthorized", 401);
  }

  const formData = await request.formData();
  const file = formData.get("video") as File | null;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const originalSize = formData.get("originalSize") as string;

  if (!file) {
    return errorResponse("No file provided", 400);
  }

  if (!title || !description || !originalSize) {
    return errorResponse("Missing required fields", 400);
  }

  // Restrict file size to 100MB
  if (file.size > MAX_FILE_SIZE) {
    return errorResponse("File size must be less than 100MB", 400);
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "cloudinary-saas-video-uploads",
          resource_type: "video",
          eager: [{ quality: "auto", fetch_format: "mp4" }],
          eager_async: true,
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result as UploadApiResponse);
        }
      );

      uploadStream.end(buffer);
    }
  );

  const video = await prisma.video.create({
    data: {
      title,
      description,
      publicId: uploadResult.public_id,
      originalSize,
      compressedSize: uploadResult.bytes.toString(),
      duration: uploadResult.duration ?? 0,
    },
  });

  return successResponse<VideoUploadResponse["data"]>(
    "Video uploaded successfully",
    video,
    201
  );
});
