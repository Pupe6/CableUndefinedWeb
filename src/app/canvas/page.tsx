"use client";

import React, { useState } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import "@wokwi/elements";
import { ArduinoMegaElement } from "@wokwi/elements";

interface ElementProps {
	x: number;
	y: number;
	onDrag: (position: { x: number; y: number }) => void;
	onRotate: (rotation: number) => void;
	children?: React.ReactNode;
}

const RotatableElement: React.FC<ElementProps> = ({
	x,
	y,
	onDrag,
	onRotate,
	children,
}) => {
	const [rotation, setRotation] = useState(0);

	const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
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
		<Draggable position={{ x, y }} onDrag={handleDrag}>
			<div
				style={{
					transform: `rotate(${rotation}deg)`,
					position: "absolute",
					transition: "transform 150ms ease",
					cursor: "move",
				}}>
				{children}
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
		Array<{ id: number; x: number; y: number; rotation?: number }>
	>([
		{ id: 1, x: 50, y: 50 },
		{ id: 2, x: 150, y: 150 },
		// Add more elements as needed
	]);

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
		<div>
			{elements.map((element, index) => (
				<RotatableElement
					key={element.id}
					x={element.x}
					y={element.y}
					onDrag={newPosition => handleDrag(index, newPosition)}
					onRotate={newRotation => handleRotate(index, newRotation)}>
					{/* Your element content goes here */}
					<wokwi-arduino-nano></wokwi-arduino-nano>
				</RotatableElement>
			))}
		</div>
	);
};

export default Canvas;
