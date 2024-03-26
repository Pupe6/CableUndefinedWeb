import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { useAppSelector } from "@/redux/hooks";
import {
	selectDiagrams,
	selectDiagramById,
} from "@/redux/features/diagrams/diagrams-slice";

import type { Diagram } from "@/types/diagrams";

import { useNavigate, useParams } from "react-router-dom";

export function DiagramsCombobox() {
	const { id } = useParams();

	const diagrams = useAppSelector(selectDiagrams);
	const currentDiagramBySelector = useAppSelector((state) =>
		selectDiagramById(state, id ?? "")
	);
	const [open, setOpen] = React.useState(false);
	const [currentDiagram, setCurrentDiagram] = React.useState<Diagram>();

	const navigate = useNavigate();

	React.useLayoutEffect(() => {
		if (id) {
			if (!currentDiagramBySelector) {
				navigate("/not-found", { replace: true });
			}
			setCurrentDiagram(currentDiagramBySelector);
		} else {
			navigate("/dashboard");
		}
	}, [diagrams]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					<div className="flex items-center gap-2">
						<div
							className="mr-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-primary
						 p-0 font-bold text-primary-foreground"
						>
							<span>
								{currentDiagram
									? currentDiagram.name.charAt(0)
									: "N"}
							</span>
						</div>
						<span className="truncate">
							{currentDiagram
								? currentDiagram.name
								: "Select diagram"}
						</span>
					</div>
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search diagram..." />
					<CommandList>
						<CommandEmpty>No diagram found.</CommandEmpty>

						<CommandGroup
							heading="Diagrams"
							className="data-[disabled]:pointer-events-none"
						>
							{diagrams.map((diagram) => (
								<CommandItem
									key={diagram._id}
									value={diagram.name}
									onSelect={() => {
										navigate(`/dashboard/${diagram._id}`);
										setCurrentDiagram(diagram);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											diagram._id === currentDiagram?._id
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									{diagram.name}
								</CommandItem>
							))}
						</CommandGroup>
						<CommandSeparator />
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									setOpen(false);
									navigate("/dashboard/new");
								}}
							>
								<Plus className="mr-2 h-4 w-4" />
								Create new diagram
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
