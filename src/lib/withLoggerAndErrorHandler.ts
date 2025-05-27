import { NextRequest, NextResponse } from "next/server";
import logger from "./logger";
import { errorResponse } from "./responseWrapper";
import { Prisma } from "@prisma/client";

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

      // Log the error with additional context
      logger.error(
        JSON.stringify({
          method: request.method,
          url: request.nextUrl.pathname,
          error: error.message || "Unknown error",
          errorType: error.constructor.name,
          stack: error.stack,
          responseTime: `${duration}ms`,
        })
      );

      // Handle different types of errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        return errorResponse("Database error", 400, {
          code: error.code,
          message: error.message,
        });
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        // Handle Prisma validation errors
        return errorResponse("Invalid data provided", 400, {
          message: error.message,
        });
      }

      if (error instanceof SyntaxError) {
        // Handle JSON parsing errors
        return errorResponse("Invalid JSON in request body", 400, {
          message: error.message,
        });
      }

      // Handle all other errors
      return errorResponse("Internal Server Error", 500, {
        message: error.message || "Unknown error",
        type: error.constructor.name,
      });
    }
  };
}
