import prisma from '@/lib/db';
import { updateFolderSchema } from '@/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { id, name } = body;
  try {
    await updateFolderSchema.validate({ id, name });
    const data = await prisma.folders.update({ where: { id }, data: { name } });
    return NextResponse.json({ response: 'Update Success', status: 200, data });
  } catch (error) {
    return NextResponse.json({ response: error, status: 400 });
  }
}
