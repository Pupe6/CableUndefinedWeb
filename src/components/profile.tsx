import { useAppSelector } from "@/redux/hooks";
import { Button } from "./ui/button";
import { selectUser } from "@/redux/features/auth/auth-handler-slice";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { formatDate } from "@/utils/dates";

function ProfileStripe({
	header,
	children,
}: {
	header: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex w-full flex-col gap-2">
			<div className="border-b">
				<h2>{header}</h2>
			</div>
			<div className="flex flex-row items-center gap-2">{children}</div>
		</div>
	);
}

export default function Profile({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (isOpen: boolean) => void;
}) {
	const user = useAppSelector(selectUser);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Account</DialogTitle>
					<DialogDescription>
						Manage your account information
					</DialogDescription>
				</DialogHeader>

				<div className="mt-4 space-y-4">
					<ProfileStripe header="Profile">
						<span className="relative flex shrink-0 overflow-hidden rounded-full h-16 w-16">
							<img
								className="aspect-square h-full w-full"
								alt="Profile Image"
								src="https://images.clerk.dev/oauth_github/img_2Phl0Zuonoq3M8XXD6GV1jKveyF.png"
							/>
						</span>
						<div className="flex flex-col gap-1">
							<p>{user.username}</p>
							<p className="text-muted-foreground">
								{formatDate(user.createdAt)}
							</p>
						</div>
					</ProfileStripe>
					<ProfileStripe header="Email Addresses">
						<div className="flex w-full flex-row items-center justify-between gap-2">
							<div className="flex flex-row gap-1">
								<p className="text-sm">{user.email}</p>
								<span className="rounded bg-primary-foreground px-1.5 text-xs font-bold text-primary dark:bg-primary dark:text-primary-foreground">
									Primary
								</span>
							</div>
						</div>
					</ProfileStripe>
					<ProfileStripe header="Danger Zone">
						<div className="flex flex-col gap-1">
							<p className="text-sm">Delete your account</p>
							<p className="text-xs text-muted-foreground">
								Delete your account and all its associated data.
							</p>
						</div>
						<Button variant="outline" color="destructive">
							<span>Delete</span>
							<span className="hidden sm:block"> Account</span>
						</Button>
					</ProfileStripe>
				</div>
			</DialogContent>
		</Dialog>
	);
}
