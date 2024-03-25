import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

// Layouts
import { LoggedInLayout } from "./components/layouts/LoggedInLayout";

// Pages
import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Sample from "./pages/Sample";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

export const unauthenticatedRouter = createBrowserRouter(
	[
		{
			path: "login",
			element: <LoginPage />,
		},
		{
			path: "register",
			element: <RegisterPage />,
		},
		{
			path: "*",
			element: <NoMatch />,
		},
	],
	{
		basename: global.basename,
	}
);

export const authenticatedRouter = createBrowserRouter(
	[
		{
			path: "",
			element: <Applayout />,
			children: [
				{
					path: "",
					element: <Dashboard />,
				},
				{
					path: "sample",
					element: <Sample />,
				},
			],
		},
		{
			path: "*",
			element: <NoMatch />,
		},
	],
	{
		basename: global.basename,
	}
);
