import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Toaster } from "@/components/ui/toaster";

import StoreProvider from "./redux/provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<StoreProvider>
			<App />
		</StoreProvider>
		<Toaster />
	</React.StrictMode>
);
