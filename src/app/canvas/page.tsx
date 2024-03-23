"use client";

import React, { useEffect } from "react";
import "@b.borisov/cu-elements";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	toggleGrid,
	getShowGrid,
	getAllElements,
	addElement,
	deleteElement,
} from "@/redux/features/diagrams/diagrams-slice";
import ElementContextMenu from "@/components/canvas/element-context.menu";

import { partMappings } from "@/types/wokwi-elements-mapping";

const Canvas: React.FC = () => {
	const elements = useAppSelector(getAllElements);
	const showGrid = useAppSelector(getShowGrid);
	const dispatch = useAppDispatch();

	const handleCustomEvent = (event: CustomEvent) => {
		console.log("Custom event caught!", event.detail);
		// Do something with the event data
	};

	useEffect(() => {
		document.addEventListener("pin-click", handleCustomEvent as EventListener);

		return () => {
			document.removeEventListener(
				"pin-click",
				handleCustomEvent as EventListener
			);
		};
	}, []);
	console.log(process.env.NEXT_PUBLIC_API_URL);
	return (
		<div className="flex h-screen">
			<div className="flex flex-col w-fit-content p-2 space-y-2">
				<h1 className="text-2xl font-bold text-center p-2 bg-gray-100 rounded-md">
					Choose Elements:
				</h1>
				<ScrollArea
					className="flex flex-col items-center overflow-y-auto whitespace-nowrap rounded-md border"
					aria-orientation="vertical">
					{Object.entries(partMappings).map(([name, element], idx) => (
						<div
							key={idx}
							className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer select-none"
							onClick={() => {
								dispatch(
									addElement({
										id: idx,
										x: 0,
										y: 0,
										name,
										type: element,
									})
								);
								toast("Element added", {
									action: {
										label: "Undo",
										onClick: () => {
											dispatch(deleteElement(idx));
										},
									},
									description: `Added ${name} to canvas`,
									closeButton: true,
								});
							}}>
							{name}
						</div>
					))}
				</ScrollArea>
			</div>
			<div className="flex-1 relative h-screen">
				<ContextMenu>
					<ContextMenuTrigger>
						<div
							className={`flex-1 relative h-screen ${
								showGrid ? "scene-grid" : ""
							}`}>
							{elements.map((element, idx) => (
								// <KeepScale>
								<ElementContextMenu key={idx} element={element} idx={idx} />

								// </KeepScale>
							))}
						</div>
					</ContextMenuTrigger>
					<ContextMenuContent>
						<ContextMenuCheckboxItem
							checked={showGrid}
							onCheckedChange={() => dispatch(toggleGrid())}>
							<div className="flex items-center space-x-2">
								Show Grid <div className="RightSlot">⌘+'</div>
							</div>
						</ContextMenuCheckboxItem>
					</ContextMenuContent>
				</ContextMenu>
			</div>
		</div>
	);
};

export default Canvas;
