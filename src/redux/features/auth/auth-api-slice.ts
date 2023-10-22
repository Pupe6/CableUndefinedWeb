import { apiSlice } from "../../api/api-slice";

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: "auth/login",
				method: "POST",
				body: {
					email,
					password,
				},
			}),
		}),
		register: builder.mutation({
			query: ({ email, password, name }) => ({
				url: "auth/register",
				method: "POST",
				body: {
					email,
					password,
					name,
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
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useTokenMutation,
} = authApiSlice;
