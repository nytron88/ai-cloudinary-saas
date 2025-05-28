import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/responseWrapper";
import { withLoggerAndErrorHandler } from "@/lib/withLoggerAndErrorHandler";
import { auth } from "@clerk/nextjs/server";
import { ImageResponse } from "@/types/image";
import cloudinary from "@/lib/cloudinary";

interface CloudinaryUploadResponse {
  public_id: string;
  [key: string]: any;
}

export const POST = withLoggerAndErrorHandler(async (request: NextRequest) => {
  const { userId } = await auth();

  if (!userId) {
    return errorResponse("Unauthorized", 401);
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return errorResponse("No file provided", 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<CloudinaryUploadResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "cloudinary-saas-uploads",
          },
          (error, result) => {
            if (error) reject(error);
            resolve(result as CloudinaryUploadResponse);
          }
        );

        uploadStream.end(buffer);
      }
    );

    return successResponse<ImageResponse["data"]>(
      "Image uploaded successfully",
      { public_id: uploadResult.public_id }
    );
  } catch (error) {
    return errorResponse("Failed to upload image", 500);
  }
});
