import prisma from '@/lib/db';
import { folderSchema } from '@/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
   try {
      const body = await req.json();
      const { user_id } = body;
      await folderSchema.validate({ user_id });
      const data = await prisma.folders.findMany({
         where: { user_id: body.user_id },
         include: { notes: true }
      });
      return NextResponse.json(data);
   } catch (e: any) {
      return NextResponse.json({ status: 400, response: e.errors });
   }
}
