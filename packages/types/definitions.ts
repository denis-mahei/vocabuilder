export interface SignUpRequest {
	name: string;
	email: string;
	password: string;
}

export interface SignInRequest {
	email: string;
	password: string;
}

export interface AuthResponse {
	email: string;
	name: string;
	token: string;
}

export interface CurrentResponse extends AuthResponse {
	_id: string;
}

export const CATEGORIES = [
	"verb",
	"participle",
	"noun",
	"adjective",
	"pronoun",
	"numerals",
	"adverb",
	"preposition",
	"conjunction",
	"phrasal verb",
	"functional phrase"
] as const;

export type Categories = ( typeof CATEGORIES )[number];

export interface WordRequest {
	en: string;
	ua: string;
	category: Categories;
	isIrregular: boolean;
}

export interface WordResponse extends WordRequest {
	_id: string;
	owner: string;
	progress: number;
}

export interface SearchParametersRequest {
	keyword?: string;
	category?: string;
	isIrregular?: boolean;
	page: number;
	limit: number;
}

export interface SearchParametersResponse {
	results: Omit<WordResponse, 'owner' | 'progress'>[];
	totalPages: number;
	pages: number;
	perPage: number;
}