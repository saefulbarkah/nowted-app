import prisma from '@/lib/db';
import { deleteFolderSchema } from '@/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  let notes;
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
    //  if (data.notes) {
    //    await prisma.notes.findMany({
    //      where: { folder_id: data.id },
    //    });
    //  }
    await prisma.trashes.create({
      data: {
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
