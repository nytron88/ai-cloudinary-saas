import { NextRequest } from "next/server";
import { withLoggerAndErrorHandler } from "@/lib/withLoggerAndErrorHandler";
import { successResponse } from "@/lib/responseWrapper";
import { prisma } from "@/lib/prisma";
import { VideoResponse } from "@/types/video";

export const GET = withLoggerAndErrorHandler(async (request: NextRequest) => {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
  });

  return successResponse<VideoResponse["data"]>(
    "Successfully fetched videos",
    videos
  );
});
