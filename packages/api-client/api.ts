import axios from "axios";
import { AuthResponse, SignInRequest, SignUpRequest } from "@vocabuilder/types";

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

export const signOut = async () => {
	try {
		await apiClient.post("/users/signout");
	} catch (error) {
		console.error(error);
	}
}