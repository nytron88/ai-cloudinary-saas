import { Video } from "@prisma/client";
import { APIResponse } from "./APIResponse";

export interface VideoResponse extends APIResponse {
  data: Video[];
}

export interface VideoUploadResponse extends APIResponse {
  data: {
    title: string;
    description: string;
    publicId: string;
    originalSize: string;
    compressedSize: string;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
  };
}
