import { apiSlice } from "../../api/api-slice";
import { getSocket } from "@/utils/socket";
import { SocketEvent, SocketNamespace } from "@/types/socket";
import type { User } from "@/types/users";

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
	endpoints: (builder) => ({
		login: builder.mutation<User, LoginRequest>({
			queryFn: ({ email, password }) => {
				const socket = getSocket(SocketNamespace.AUTH);

				socket.emit(SocketEvent.LOGIN, { email, password });

				return new Promise((resolve, reject) => {
					socket.on(
						SocketEvent.LOGIN,
						(data: { user: User; error: string }) => {
							if (data.error) {
								reject(data.error);
							} else {
								resolve({
									data: {
										_id: data.user._id,
										email: data.user.email,
										username: data.user.username,
										createdAt: data.user.createdAt,
										updatedAt: data.user.updatedAt,
										lastActivity: data.user.lastActivity,
										_token: data.user._token,
									},
								});
							}
						}
					);
				});
			},
		}),
		register: builder.mutation<void, RegisterRequest>({
			queryFn: ({ email, password, username }) => {
				const socket = getSocket(SocketNamespace.AUTH);

				socket.emit(SocketEvent.REGISTER, {
					email,
					password,
					username,
				});

				return new Promise((resolve, reject) => {
					socket.on(SocketEvent.REGISTER, (data: any) => {
						console.log(data);
						if ("error" in data) {
							reject(data.error);
						} else {
							resolve({ data: undefined });
						}
					});
				});
			},
		}),
		logout: builder.mutation<void, void>({
			queryFn: () => {
				const socket = getSocket(SocketNamespace.AUTH);
				console.log("logging out", localStorage.getItem("_token"));
				socket.emit(SocketEvent.LOGOUT, {
					token: localStorage.getItem("_token"),
				});

				return new Promise((resolve, reject) => {
					socket.on(SocketEvent.LOGOUT, (data: any) => {
						if (data.error) {
							reject(data.error);
						} else {
							resolve({ data: undefined });
						}
					});
				});
			},
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
