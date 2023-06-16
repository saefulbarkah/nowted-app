import prisma from '@/lib/db';
import { notesSchema } from '@/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, folder_id } = body;
    await notesSchema.validate({ user_id, folder_id });
    const data = await prisma.notes.findMany({
      where: { user_id, deleted_at: null, folder_id },
    });
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ status: 400, response: e.errors });
  }
}
