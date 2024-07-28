import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma-client";
import { NextApiRequest } from "next";

export async function DELETE(req: NextApiRequest, { params }: { params: { id: string } }) {
	const {id} = params

	const user = await prisma.user.delete({
			where: {id: Number(id)}
	});
	
	return NextResponse.json({message: "Пользователь удален", user});
}