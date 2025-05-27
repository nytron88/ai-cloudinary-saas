import { Video } from "@prisma/client";
import { APIResponse } from "./APIResponse";

export interface VideoResponse extends APIResponse {
  data: Video[];
}
