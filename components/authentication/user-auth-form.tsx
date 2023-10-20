"use client";

import * as React from "react";

import { cn } from "@lib/utils";
import { Icons } from "@components/icons";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z
	.object({
		username: z.string().regex(/^[a-zA-Z0-9]+$/),
		email: z.string().email(),
		password: z
			.string()
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type FormValues = z.infer<typeof schema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
		setIsLoading(true);
		try {
			// await signIn("credentials", {
			// 	redirect: false,
			// 	username: data.username,
			// 	password: data.password,
			// });
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="username">
							Username
						</Label>
						<Input
							id="username"
							placeholder="Username"
							type="text"
							autoCapitalize="none"
							autoComplete="username"
							autoCorrect="off"
							disabled={isLoading}
							{...register("username")}
						/>
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
							{...register("email")}
						/>
						<Label className="sr-only" htmlFor="password">
							Password
						</Label>
						<Input
							id="password"
							placeholder="Password"
							type="password"
							autoCapitalize="none"
							autoComplete="current-password"
							autoCorrect="off"
							disabled={isLoading}
							{...register("password")}
						/>
						<Label className="sr-only" htmlFor="confirm-password">
							Confirm Password
						</Label>
						<Input
							id="confirm-password"
							placeholder="Confirm Password"
							type="password"
							autoCapitalize="none"
							autoComplete="current-password"
							autoCorrect="off"
							disabled={isLoading}
							{...register("confirmPassword")}
						/>
					</div>
					<Button disabled={isLoading}>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Sign In with Email
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<Button variant="outline" type="button" disabled={isLoading}>
				{isLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.gitHub className="mr-2 h-4 w-4" />
				)}{" "}
				Github
			</Button>
		</div>
	);
}
