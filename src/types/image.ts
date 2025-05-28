import { APIResponse } from "./APIResponse";

export interface ImageResponse extends APIResponse {
  data: {
    public_id: string;
  };
}
