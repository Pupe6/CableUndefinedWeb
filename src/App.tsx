import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { authenticatedRouter, unauthenticatedRouter } from "./Router";

import { useAppSelector } from "@/redux/hooks";
import { selectIsAuthenticated } from "@/redux/features/auth/auth-handler-slice";

export default function App() {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	return (
		<ThemeProvider>
			<RouterProvider
				router={
					isAuthenticated
						? authenticatedRouter
						: unauthenticatedRouter
				}
			/>
		</ThemeProvider>
	);
}
