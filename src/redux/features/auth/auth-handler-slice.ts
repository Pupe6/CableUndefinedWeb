import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@reduxjs/toolkit/query";
import { authApiSlice } from "./auth-api-slice";
import { boolean } from "zod";

interface InitialState {
	isAuthenticated: boolean;
}

const authState: InitialState = {
	isAuthenticated: false,
};

export const authHandlerSlice = createSlice({
	name: "auth",
	initialState: authState,
	reducers: {
		setAuth: (state, action) => {
			action.payload.state.isAuthenticated = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			authApiSlice.endpoints.login.matchFulfilled,
			(state, action) => {
				state.isAuthenticated = true;
				console.log(document.cookie);
			}
		);
	},
});
