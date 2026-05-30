// app/api/test/route.js

import { connectDatabase } from "@/lib/database";

export async function GET() {
  await connectDatabase();

  return Response.json({
    success: true,
    message: "Database connected successfully",
  });
}