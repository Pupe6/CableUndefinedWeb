import React from "react";
import { Metadata } from "next";

import { UserAuthPage } from "../../components/authentication/user-auth-page";

export const metadata: Metadata = {
	title: "Login",
	description: "User login form.",
};

export default function LoginPage() {
	return <UserAuthPage />;
}
