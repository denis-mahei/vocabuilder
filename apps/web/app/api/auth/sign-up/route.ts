import { NextRequest, NextResponse } from "next/server";
import { signUp } from "@vocabuilder/api";
import { SignUpRequest } from "@vocabuilder/types";
import axios from "axios";

export async function POST ( req: NextRequest ) {
	const payload = await req.json() as SignUpRequest;
	try {
		const { token, ...user } = await signUp(payload)
		if (!token) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
		}
		const res = NextResponse.json(user)
		res.cookies.set('accessToken', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax'
		})
		return res
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return NextResponse.json(
				{ message: err.response?.data?.message },
				{ status: err.response?.status }
			)
		}
	}
}