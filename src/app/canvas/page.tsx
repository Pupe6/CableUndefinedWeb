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

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	getAllElements,
	addElement,
	dragElement,
	editElementName,
	deleteElement,
} from "@/redux/features/diagrams/diagrams-slice";
interface ElementProps {
	id: number;
	children?: React.ReactNode;
}

const DiagramElement: React.FC<ElementProps> = ({ id, children }) => {
	const element = useAppSelector(state =>
		getAllElements(state).find(el => el.id === id)
	);
	const nodeRef = useRef(null);
	const [rotation, setRotation] = useState(0);

	const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
		console.log(ui.deltaX, ui.deltaY, e);
		dragElement({
			id,
			x: ui.x,
			y: ui.y,
		});
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

const Canvas: React.FC = () => {
	const elements = useAppSelector(getAllElements);
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
			<div className="flex-1 relative bg-gray-200 overflow-hidden">
				{elements.map((element, idx) => (
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
							<ContextMenuItem
								onClick={() => {
									const newName = prompt(
										"Enter new name",
										element.name
									);
									if (newName) {
										dispatch(
											editElementName({
												id: element.id,
												name: newName,
											})
										);
									}
								}}>
								Rename
							</ContextMenuItem>
							<ContextMenuItem>Move up</ContextMenuItem>
							<ContextMenuItem>Rotate</ContextMenuItem>
							<ContextMenuItem
								onClick={() =>
									dispatch(deleteElement(element.id))
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
