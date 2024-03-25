"use client";
import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "./auth-api-slice";
import type { User } from "@/types/users";

const authState: User = {
	createdAt: "",
	email: "",
	lastActivity: "",
	updatedAt: "",
	username: "",
	_id: "",
	_token: localStorage.getItem("_token") || "",
};

export const authHandlerSlice = createSlice({
	name: "auth",
	initialState: authState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApiSlice.endpoints.login.matchFulfilled,
			(state, action) => {
				console.log("login fulfilled", action.payload);
				state._id = action.payload._id;
				state.email = action.payload.email;
				state.username = action.payload.username;
				state.createdAt = action.payload.createdAt;
				state.updatedAt = action.payload.updatedAt;
				state.lastActivity = action.payload.lastActivity;
				state._token = action.payload._token;
				state = action.payload;
				localStorage.setItem("_token", action.payload._token);
			}
		);
	},
});

export const {} = authHandlerSlice.actions;

export const selectIsAuthenticated = (state: { auth: User }) =>
	state.auth._token !== "";
export const selectUser = (state: { auth: User }) => state.auth;

export default authHandlerSlice.reducer;
