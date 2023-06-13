import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const body = await req.json();
  await prisma.folder.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
    },
  });
  return NextResponse.json({ response: "Update Success" });
}
