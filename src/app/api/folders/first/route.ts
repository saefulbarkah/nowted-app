import prisma from '@/lib/db';
import { folderSchema } from '@/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id } = body;
    await folderSchema.validate({ user_id });
    const data = await prisma.folders.findFirst({
      where: { user_id: body.user_id, deleted_at: null, can_deleted: false },
      select: {
        id: true,
        notes: true,
      },
    });
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ status: 400, response: e.errors });
  }
}
