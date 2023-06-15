import prisma from '@/lib/db';
import { updateFolderSchema } from '@/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { id, name, user_id } = body;
  try {
    await updateFolderSchema.validate({ id, name });
    const isExists = await prisma.folders.findFirst({
      where: {
        name: name,
        user_id: user_id,
      },
    });
    if (isExists) {
      if (isExists.id !== id) {
        return NextResponse.json({
          response: `Folder ${isExists.name} already exist`,
          status: 400,
          error: 'isExists',
        });
      }
    }
    const data = await prisma.folders.update({ where: { id }, data: { name } });
    return NextResponse.json({ response: 'Update Success', status: 200, data });
  } catch (error) {
    return NextResponse.json({ response: error, status: 400 });
  }
}
