import { configureStore, combineReducers } from "@reduxjs/toolkit";

const AppReducer = combineReducers({
	// ...reducers
});

export const rootReducer = (state: any, action: any) => {
	return AppReducer(state, action);
};

export const store = configureStore({
	reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
