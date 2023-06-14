import prisma from '@/lib/db';
import { deleteFolderSchema } from '@/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
   const body = await req.json();
   const { id } = body;
   try {
      await deleteFolderSchema.validate({ id });
      await prisma.folders.delete({
         where: {
            id
         }
      });
      return NextResponse.json({ response: 'Delete folder success', status: 200 });
   } catch (error: any) {
      return NextResponse.json({ response: error, status: 200 });
   }
}
