import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../prisma/prisma-client";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const {id} = params

	const user = await prisma.user.delete({
			where: {id: Number(id)}
	});
	
	return NextResponse.json({message: "Пользователь удален", user});
}