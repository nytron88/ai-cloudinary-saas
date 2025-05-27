import { NextRequest } from "next/server";
import { withLoggerAndErrorHandler } from "@/lib/withLoggerAndErrorHandler";
import { successResponse } from "@/lib/responseWrapper";
import { prisma } from "@/lib/prisma";

export const GET = withLoggerAndErrorHandler(async (request: NextRequest) => {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
  });

  return successResponse(videos, "Successfull fetched videos", 200);
});
