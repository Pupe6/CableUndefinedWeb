"use client";

import React, { useState, useRef } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { wokwiElements } from "../../../utils/extract-wokwi-elements";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	toggleGrid,
	getShowGrid,
	getAllElements,
	addElement,
	dragElement,
	editElementName,
	deleteElement,
} from "@/redux/features/diagrams/diagrams-slice";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { CheckboxItem, ItemIndicator } from "@radix-ui/react-context-menu";
import { CheckIcon } from "lucide-react";

const strypesCanvasStyles = `bg-gradient-to-r from-transparent via-transparent to-rgba(211, 211, 211, 0.5) bg-repeat-x w-40 h-40
bg-gradient-to-r from-rgba(211, 211, 211, 0.5) to-transparent bg-repeat-x h-1 w-8
bg-gradient-to-b from-transparent via-transparent to-rgba(211, 211, 211, 0.5) bg-repeat-y h-40 w-40
bg-gradient-to-b from-rgba(211, 211, 211, 0.5) to-transparent bg-repeat-y h-8 w-1`;
interface ElementProps {
	id: number;
	children?: React.ReactNode;
}

const DiagramElement: React.FC<ElementProps> = ({ id, children }) => {
	const dispatch = useAppDispatch();
	const element = useAppSelector(state =>
		getAllElements(state).find(el => el.id === id)
	);
	const nodeRef = useRef(null);
	const [rotation, setRotation] = useState(0);

	const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
		console.log(ui.deltaX, ui.deltaY, e);
		dispatch(
			dragElement({
				id,
				x: ui.x,
				y: ui.y,
			})
		);
	};

	// const handleRotate = () => {
	// 	const newRotation = rotation + 45; // Adjust the rotation angle as needed
	// 	setRotation(newRotation);
	// 	onRotate(newRotation);
	// };

	return (
		<Draggable
			nodeRef={nodeRef}
			position={{
				x: element ? element.x : 0,
				y: element ? element.y : 0,
			}}
			onDrag={handleDrag}
			// bounds="parent"
			positionOffset={{ x: "100%", y: "10%" }}
			key={id}>
			<div
				ref={nodeRef}
				style={{
					transform: `rotate(${rotation}deg)`,
					position: "absolute",
					transition: "transform 150ms ease",
					cursor: "move",
				}}
				className="flex flex-col items-center space-y-2 p-2 bg-gray-100 rounded-md w-1/6">
				{children}
				{element?.name}
				<div
					// onClick={handleRotate}
					style={{
						cursor: "pointer",
						background: "gray",
						padding: "5px",
						borderRadius: "5px",
					}}>
					Rotate
				</div>
			</div>
		</Draggable>
	);
};

const schema = z.object({
	name: z.string(),
});

type FormValues = z.infer<typeof schema>;

const RenameElementForm = ({
	id,
	initialName,
}: {
	id: number;
	initialName: string;
}) => {
	const dispatch = useAppDispatch();

	const form = useForm<FormValues>({
		mode: "onSubmit",
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
		dispatch(
			editElementName({
				id: id,
				name: data.name,
			})
		);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="name"
					render={({ field, formState }) => (
						<FormItem>
							<FormControl>
								<Input
									id="name"
									type="text"
									autoCapitalize="none"
									autoComplete="off"
									autoCorrect="off"
									placeholder="Enter a new name"
									className="w-full"
									defaultValue={initialName}
									disabled={false}
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red-500 pt-1">
								{formState.errors.name?.message}
							</FormMessage>
						</FormItem>
					)}
				/>

				<DialogFooter className="flex justify-end items-center space-x-2 pt-2 bg-gray-100 rounded-b-md">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</DialogClose>
					<Button type="submit" size="sm" className="px-3">
						Rename
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};

const Canvas: React.FC = () => {
	const elements = useAppSelector(getAllElements);
	const showGrid = useAppSelector(getShowGrid);
	const dispatch = useAppDispatch();

	return (
		<div className="flex h-screen">
			<div className="flex flex-col h-screen w-fit-content p-2 space-y-2">
				<h1 className="text-2xl font-bold text-center p-2 bg-gray-100 rounded-md">
					Choose Elements:
				</h1>
				<ScrollArea
					className="flex flex-col items-center overflow-y-auto whitespace-nowrap rounded-md border"
					aria-orientation="vertical">
					{wokwiElements.map((element, idx) => (
						<div
							key={idx}
							className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer select-none"
							onClick={() => {
								dispatch(
									addElement({
										id: idx,
										x: 0,
										y: 0,
										name: element.name,
										type: element.element,
									})
								);
								toast("Element added", {
									action: {
										label: "Undo",
										onClick: () => {
											dispatch(deleteElement(idx));
										},
									},
									description: `Added ${element.name} to canvas`,
									closeButton: true,
								});
							}}>
							{element.name}
						</div>
					))}
				</ScrollArea>
			</div>
			<div
				className={`flex-1 relative overflow-hidden ${
					showGrid ? strypesCanvasStyles : ""
				}`}>
				{elements.map((element, idx) => (
					<Dialog>
						<ContextMenu>
							<ContextMenuTrigger>
								<DiagramElement key={idx} id={element.id}>
									<div className="flex items-center space-x-2">
										{element.type}
									</div>
									<wokwi-arduino-mega
										pinInfo={[
											{
												name: "GND",
												x: 1,
												y: 2,
												signals: [
													{
														type: "i2c",
														signal: "SDA",
														bus: 1,
													},
												],
											},
										]}
									/>
								</DiagramElement>
							</ContextMenuTrigger>
							<ContextMenuContent>
								<ContextMenuItem>
									<DialogTrigger asChild>
										<ContextMenuItem>
											Rename
										</ContextMenuItem>
									</DialogTrigger>
								</ContextMenuItem>
								<ContextMenuItem>Move up</ContextMenuItem>
								<ContextMenuItem>Rotate</ContextMenuItem>
								<ContextMenuItem
									onClick={() =>
										dispatch(deleteElement(element.id))
									}
									// make it look better
									className="hover:text-red-500 cursor-pointer">
									Remove
								</ContextMenuItem>
							</ContextMenuContent>
						</ContextMenu>
						<DialogContent className="sm:max-w-md">
							<DialogHeader>
								<DialogTitle>Rename Element</DialogTitle>
								<DialogDescription>
									Enter a new name for the element
								</DialogDescription>
							</DialogHeader>
							<RenameElementForm
								id={element.id}
								initialName={element.name}
							/>
						</DialogContent>
					</Dialog>
				))}
			</div>
			{/* <CheckboxItem
							className="ContextMenuCheckboxItem"
							checked={showGrid}
							onCheckedChange={() => dispatch(toggleGrid())}>
							<ItemIndicator className="ContextMenuItemIndicator">
								<CheckIcon />
							</ItemIndicator>
							Show Grid <div className="RightSlot">⌘+'</div>
						</CheckboxItem> */}
		</div>
	);
};

export default Canvas;
