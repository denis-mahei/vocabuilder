import axios from "axios";
import { AuthResponse, SignInRequest, SignUpRequest } from "@vocabuilder/types";

export const clientApi = axios.create({
	baseURL: '/api',
	withCredentials: true,
})

export const signUpUser = async ( payload: SignUpRequest ) => {
	const { data } = await clientApi.post<Omit<AuthResponse, 'token'>>("/auth/sign-up", payload);
	return data
}

export const signInUser = async ( payload: SignInRequest ) => {
	const { data } = await clientApi.post<AuthResponse>("/auth/sign-in", payload);
	return data
}

export const getCurrentUser = async () => {
	const { data } = await clientApi.get('/auth/current');
	return data;
}