import { NextRequest, NextResponse } from "next/server";
import { signOut } from "@vocabuilder/api";
import { cookies } from "next/headers";

export async function POST ( req: NextRequest ) {
	const cookieStore = await cookies()
	const token = cookieStore.get('accessToken')?.value
	if (!token) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
	}
	try {
		await signOut(token);
	} catch (err) {
		console.error(err.message);
	}
	cookieStore.delete("accessToken")
	return NextResponse.json({ message: "Signed out successfully." });
}