import { NextRequest, NextResponse } from "next/server";
import logger from "./logger";
import { errorResponse } from "./responseWrapper";

type Handler = (request: NextRequest) => Promise<NextResponse>;

export function withLoggerAndErrorHandler(handler: Handler): Handler {
  return async function wrappedHandler(request: NextRequest) {
    const start = Date.now();
    try {
      const response = await handler(request);

      const duration = Date.now() - start;
      logger.info(
        JSON.stringify({
          method: request.method,
          url: request.nextUrl.pathname,
          status: response.status,
          responseTime: `${duration}ms`,
        })
      );

      return response;
    } catch (error: any) {
      const duration = Date.now() - start;
      logger.error(
        JSON.stringify({
          method: request.method,
          url: request.nextUrl.pathname,
          error: error.message || "Unknown error",
          responseTime: `${duration}ms`,
        })
      );

      return errorResponse(
        "Internal Server Error",
        500,
        error.message || "Unknown error"
      );
    }
  };
}
