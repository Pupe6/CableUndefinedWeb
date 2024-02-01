import { apiSlice } from "../../api/api-slice";

export interface LoginRequest {
	email: string;
	password: string;
}
export interface RegisterRequest {
	email: string;
	password: string;
	username: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<void, LoginRequest>({
			query: ({ email, password }) => ({
				url: "auth/login",
				method: "POST",
				body: {
					email,
					password,
				},
				credentials: "include",
				withCredentials: true,
			}),
		}),
		register: builder.mutation<void, RegisterRequest>({
			query: ({ email, password, username }) => ({
				url: "auth/register",
				method: "POST",
				body: {
					email,
					password,
					username,
				},
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: "auth/logout",
				method: "POST",
			}),
		}),
		token: builder.mutation({
			query: () => ({
				url: "auth/token",
				method: "POST",
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useTokenMutation,
} = authApiSlice;
