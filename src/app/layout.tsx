import "./globals.css";
import * as React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Cable Undefined",
	description: "A robust cable management system.",
};

import { ThemeProvider } from "../components/theme-provider";
import { ReduxProvider } from "../redux/provider";

import { Toaster } from "../components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					disableTransitionOnChange
					attribute="class"
					defaultTheme="system"
					enableSystem>
					<ReduxProvider>{children}</ReduxProvider>
				</ThemeProvider>
				<Toaster />
				<SonnerToaster />
			</body>
		</html>
	);
}
