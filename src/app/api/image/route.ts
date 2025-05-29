import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/responseWrapper";
import { withLoggerAndErrorHandler } from "@/lib/withLoggerAndErrorHandler";
import { auth } from "@clerk/nextjs/server";
import { ImageResponse } from "@/types/image";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

export const POST = withLoggerAndErrorHandler(async (request: NextRequest) => {
  const { userId } = await auth();

  if (!userId) {
    return errorResponse("Unauthorized", 401);
  }

  const formData = await request.formData();
  const file = formData.get("image") as File | null;

  if (!file) {
    return errorResponse("No file provided", 400);
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "cloudinary-saas-image-uploads",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result as UploadApiResponse);
        }
      );

      uploadStream.end(buffer);
    }
  );

  return successResponse<ImageResponse["data"]>("Image uploaded successfully", {
    publicId: uploadResult.public_id,
  });
});
