import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  try {
    const data = await prisma.folder.findMany({
      where: { userId: userId },
      include: { note: true },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      title: "ERROR",
      status: 500,
    });
  }
}
