import { NextResponse } from "next/server";

export function successResponse<T = any>(
  message = "Request successful",
  data?: T,
  status = 200
) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function errorResponse(
  message = "Something went wrong",
  status = 500,
  errors?: any
) {
  return NextResponse.json(
    {
      success: false,
      message,
      ...(errors && { errors }),
    },
    { status }
  );
}
