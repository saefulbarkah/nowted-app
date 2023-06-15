import prisma from '@/lib/db';
import { createFolderSchema } from '@/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, user_id } = body;
  try {
    await createFolderSchema.validate({ name, user_id });
    const isExists = await prisma.folders.findFirst({
      where: {
        name: name,
        user_id: user_id,
        deleted_at: null,
      },
    });
    if (isExists) {
      return NextResponse.json({
        response: `Folder ${isExists.name} already exist`,
        status: 400,
        error: 'isExists',
      });
    }
    const data = await prisma.folders.create({
      data: {
        name: name,
        user_id: user_id,
        can_deleted: true,
      },
    });
    return NextResponse.json({
      response: 'Create Success',
      status: 200,
      data,
    });
  } catch (error: any) {
    return NextResponse.json({ response: error.errors, status: 400 });
  }
}
