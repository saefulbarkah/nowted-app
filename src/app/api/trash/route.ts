import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
   const body = await req.json();
   const data = await prisma.trashes.findMany({
      where: {
         user_id: body.user_id,
         folder_id: body.folderId
      }
   });
   return NextResponse.json(data);
}
