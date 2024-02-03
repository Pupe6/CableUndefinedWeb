"use client";

import React, { useState, useRef } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import "@wokwi/elements";
import { wokwiElements } from "../../../utils/extract-wokwi-elements";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@radix-ui/react-context-menu";
import { toast } from "sonner";

interface ElementProps {
	id: number;
	x: number;
	y: number;
	name?: string;
	onDrag: (position: { x: number; y: number }) => void;
	onRotate: (rotation: number) => void;
	children?: React.ReactNode;
}

const DiagramElement: React.FC<ElementProps> = ({
	id,
	x,
	y,
	name,
	onDrag,
	onRotate,
	children,
}) => {
	const nodeRef = useRef(null);
	const [rotation, setRotation] = useState(0);

	const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
		console.log(ui.deltaX, ui.deltaY);
		onDrag({
			x: x + ui.deltaX,
			y: y + ui.deltaY,
		});
	};

	const handleRotate = () => {
		const newRotation = rotation + 45; // Adjust the rotation angle as needed
		setRotation(newRotation);
		onRotate(newRotation);
	};

	return (
		<Draggable
			nodeRef={nodeRef}
			position={{ x, y }}
			onDrag={handleDrag}
			bounds="parent"
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
				{name && <div>{name}</div>}
				<div
					onClick={handleRotate}
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

const Canvas: React.FC = () => {
	const [elements, setElements] = useState<
		Array<{
			id: number;
			x: number;
			y: number;
			rotation?: number;
			name?: string;
			element: any;
		}>
	>([]);

	const handleDrag = (
		index: number,
		newPosition: { x: number; y: number }
	) => {
		setElements(prevElements => {
			const updatedElements = [...prevElements];
			updatedElements[index] = {
				...updatedElements[index],
				...newPosition,
			};
			return updatedElements;
		});
	};

	const handleRotate = (index: number, newRotation: number) => {
		console.log(newRotation);
		setElements(prevElements => {
			const updatedElements = [...prevElements];
			updatedElements[index] = {
				...updatedElements[index],
				rotation: newRotation,
			};
			return updatedElements;
		});
	};

	return (
		<div className="flex h-screen">
			<div className="flex flex-col h-screen w-fit-content p-2 space-y-2">
				<h1 className="text-2xl font-bold text-center p-2 bg-gray-100 rounded-md">
					Choose Elements:
				</h1>
				<ScrollArea
					className="flex flex-col items-center overflow-y-auto whitespace-nowrap rounded-md border"
					aria-orientation="vertical">
					{wokwiElements.map((element, index) => (
						<div
							key={index}
							className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer select-none"
							onClick={() => {
								setElements(prevElements => [
									...prevElements,
									{
										id: prevElements.length,
										x: 0,
										y: 0,
										element: element,
										name: element.name,
									},
								]);
								toast("Element added", {
									action: {
										label: "Undo",
										onClick: () => {
											setElements(prevElements =>
												prevElements.filter(
													(_, i) => i !== index
												)
											);
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
			<div className="flex-1 relative bg-gray-200 overflow-hidden">
				{elements.map((element, index) => (
					<ContextMenu>
						<ContextMenuTrigger>
							<DiagramElement
								id={element.id}
								x={element.x}
								y={element.y}
								onDrag={newPosition =>
									handleDrag(index, newPosition)
								}
								onRotate={newRotation =>
									handleRotate(index, newRotation)
								}
								name={element.name}>
								<div
									key={index}
									className="flex items-center space-x-2">
									{element.element}
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
							<ContextMenuItem
								onClick={() => {
									const newName = prompt(
										"Enter new name",
										element.name
									);
									if (newName) {
										setElements(prevElements => {
											const updatedElements = [
												...prevElements,
											];
											updatedElements[index] = {
												...updatedElements[index],
												name: newName,
											};
											return updatedElements;
										});
									}
								}}>
								Rename
							</ContextMenuItem>
							<ContextMenuItem>Move up</ContextMenuItem>
							<ContextMenuItem>Rotate</ContextMenuItem>
							<ContextMenuItem
								onClick={() =>
									setElements(prevElements =>
										prevElements.filter(
											(_, i) => i !== index
										)
									)
								}>
								Delete
							</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				))}
			</div>
		</div>
	);
};

export default Canvas;
