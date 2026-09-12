import { NextRequest, NextResponse } from "next/server";
import { signUp } from "@vocabuilder/api";

export async function POST ( req: NextRequest ) {
	const payload = await req.json();
	try {
		const {token, ...user} = await signUp(payload)
		const res =  NextResponse.json(user)
		res.cookies.set('accessToken', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax'
		})
		return res
	} catch (error) {
		console.error(error)
	}
}