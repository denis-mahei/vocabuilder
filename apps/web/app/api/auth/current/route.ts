import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrent } from "@vocabuilder/api";
import axios from "axios";

export async function GET () {
	const cookieStore = await cookies()
	const accessToken = cookieStore.get('accessToken')?.value
	if (!accessToken) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
	}
	try {
		const { token, ...user } = await getCurrent(accessToken)
		return NextResponse.json(user)
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return NextResponse.json(
				{ message: err.response?.data?.message },
				{ status: err.response?.status }
			)
		}
	}
}