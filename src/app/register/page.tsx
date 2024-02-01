import { Metadata } from "next";

import { UserAuthPage } from "@components/authentication/user-auth-page";

export const metadata: Metadata = {
	title: "Register",
	description: "User registration form.",
};

export default function RegisterPage() {
	return <UserAuthPage register />;
}
