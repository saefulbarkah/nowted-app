import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await prisma.folder.create({
      data: {
        name: body.name,
        userId: body.userId,
      },
    });
    return NextResponse.json({ response: "Create Success" });
  } catch (error) {
    return NextResponse.json({ response: error, status: 400 });
  }
}
