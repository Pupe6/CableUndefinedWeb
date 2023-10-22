"use client";

import { Provider } from "react-redux";
import { store } from "@redux/store";

interface ReduxProviderProps {
	children: React.ReactNode;
}

export const ReduxProvider = ({ children }: ReduxProviderProps) => {
	return <Provider store={store}>{children}</Provider>;
};
