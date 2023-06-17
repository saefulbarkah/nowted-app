import prisma from '@/lib/db';
import { deleteFolderSchema } from '@/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  try {
    await deleteFolderSchema.validate({ id });
    const data = await prisma.folders.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
      include: {
        notes: true,
      },
    });
    // if (data.notes) {
    //   const notes = await prisma.notes.findMany({
    //     where: { folder_id: data.id },
    //   });
    //   note_id = notes.data;
    // }
    await prisma.trashes.upsert({
      where: { id },
      update: {
        user_id: data.user_id,
        folder_id: data.id,
      },
      create: {
        user_id: data.user_id,
        folder_id: data.id,
      },
    });
    return NextResponse.json({
      response: 'Delete folder success',
      status: 200,
      data,
    });
  } catch (error: any) {
    return NextResponse.json({ response: error, status: 200 });
  }
}
