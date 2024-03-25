import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useToast } from "@/components/ui/use-toast";

import { CreditCard, LogOut, User } from "lucide-react";

import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/auth/auth-handler-slice";

import { useLogoutMutation } from "@/redux/features/auth/auth-api-slice";

export default function Dashboard() {
	const user = useAppSelector(selectUser);

	const [logout, { isLoading, isError }] = useLogoutMutation();

	const { toast } = useToast();

	const handleLogout = async () => {
		try {
			await logout();
			toast({
				title: "Success",
				description: "Logged out successfully",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "An error occurred while logging out",
				variant: "destructive",
			});
		}
	};
	return (
		<div className="flex justify-between items-center p-4">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/dashboard">
							<h1 className="relative flex flex-row items-baseline text-2xl font-bold">
								<span className="sr-only">CableUndefined</span>
								<span className="tracking-tight hover:cursor-pointer text-primary">
									Cable
									<span className="text-muted-foreground hover:text-primary">
										Undefined
									</span>
								</span>
								<sup className="absolute left-[calc(100%+.1rem)] top-0 text-xs font-bold text-black hidden">
									[BETA]
								</sup>
							</h1>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<span className="text-5xl font-thin text-muted-foreground">
							/
						</span>
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink href="/components">
							Components
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<DropdownMenu>
				<DropdownMenuTrigger>Open</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>
						<p className="text-sm font-medium leading-none">
							{user.username}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user.email}
						</p>
					</DropdownMenuLabel>
					<DropdownMenuItem>
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard className="mr-2 h-4 w-4" />
						<span>Billing</span>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => {
							logout();
						}}
					>
						<LogOut className="mr-2 h-4 w-4" />
						<span>Log out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
