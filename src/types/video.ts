import { Video } from "@prisma/client";
import { APIResponse } from "./APIResponse";

export type VideoResponse = APIResponse<Video[]>;

export type VideoUploadData = {
  title: string;
  description: string;
  publicId: string;
  originalSize: string;
  compressedSize: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
};

export type VideoUploadResponse = APIResponse<VideoUploadData>;
