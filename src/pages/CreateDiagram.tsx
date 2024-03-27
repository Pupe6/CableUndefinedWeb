import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { CardFooter } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateDiagramMutation } from "@/redux/features/diagrams/diagrams-api-slice";

import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
	name: z.string().nonempty(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateDiagram() {
	const navigate = useNavigate();
	const { toast } = useToast();

	const [createDiagram, { isLoading }] = useCreateDiagramMutation();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	const handleSubmit = form.handleSubmit((data) => {
		try {
			createDiagram(data).unwrap();
			toast({
				title: "Success",
				description: "Diagram created successfully.",
			});
			navigate("/dashboard");
		} catch (error) {
			toast({
				title: "Error",
				description: "An error occurred while creating the diagram.",
			});
		}
	});

	return (
		<Card className="w-[350px] mx-auto my-auto">
			<CardHeader>
				<CardTitle>Let's create your diagram</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={handleSubmit}>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Diagram Name *
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button
					variant="outline"
					onClick={() => navigate("/dashboard")}
				>
					Cancel
				</Button>
				<Button
					disabled={isLoading}
					onClick={handleSubmit}
					type="submit"
				>
					Create
				</Button>
			</CardFooter>
		</Card>
	);
}
