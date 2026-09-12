import axios from "axios";
import {
	AuthResponse,
	CurrentResponse,
	SignInRequest,
	SignUpRequest
} from "@vocabuilder/types";

export const apiClient = axios.create({
	baseURL: "https://vocab-builder-backend.p.goit.global/api",
	withCredentials: true,
})

export const signUp = async ( payload: SignUpRequest ) => {
	const { data } = await apiClient.post<AuthResponse>("/users/signup", payload);
	return data;
}

export const signIn = async ( payload: SignInRequest ) => {
	const { data } = await apiClient.post<AuthResponse>("/users/signin", payload);
	return data;
}

export const signOut = async (token: string) => {
	await apiClient.post("/users/signout", null, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}

export const getCurrent = async ( token: string ) => {
	const { data } = await apiClient.get<CurrentResponse>("/users/current", {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return data;
}