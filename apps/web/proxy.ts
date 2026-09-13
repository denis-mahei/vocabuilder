import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const privateRoute = ['/dictionary', '/recommend', '/training'];
const publicRoute = ['/login', '/register'];

export async function proxy ( request: NextRequest ) {
	const cookieStore = await cookies()
	const token = cookieStore.get('accessToken')?.value
	const { pathname } = request.nextUrl

	const isPrivateRoute = privateRoute.some(( route ) => pathname.startsWith(route))
	const isPublicRoute = publicRoute.some(( route ) => pathname.startsWith(route))

	if (isPrivateRoute && !token) {
		return NextResponse.redirect(new URL('/login', request.url))
	}
	if (isPublicRoute && token) {
		return NextResponse.redirect(new URL('/dictionary', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dictionary', '/recommend', '/training', '/login', '/register'],
}