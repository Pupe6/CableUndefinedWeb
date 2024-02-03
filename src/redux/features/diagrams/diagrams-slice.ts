import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";
import * as WokwiElements from "@wokwi/elements";

type WokwiElement<T> = Partial<T> & React.ClassAttributes<T>;

type WokwiElementMap = {
	[K in keyof typeof WokwiElements]: WokwiElement<(typeof WokwiElements)[K]>;
};

interface DiagramsElement {
	id: number;
	x: number;
	y: number;
	name: string;
	type: keyof WokwiElementMap;
}

interface DiagramsState {
	elements: DiagramsElement[];
	showGrid: boolean;
}

const initialState: DiagramsState = {
	elements: [],
	showGrid: localStorage.getItem("showGrid") === "true",
};

export const diagramsSlice = createSlice({
	name: "diagrams",
	initialState,
	reducers: {
		toggleGrid: state => {
			state.showGrid = !state.showGrid;
			localStorage.setItem("showGrid", state.showGrid ? "true" : "false");
		},
		setElements: (state, action) => {
			state.elements = action.payload;
		},
		addElement: (state, action) => {
			console.log(action.payload);
			state.elements.push(action.payload);
		},
		dragElement: (state, action) => {
			const element = state.elements.find(
				e => e.id === action.payload.id
			);
			if (element) {
				element.x = action.payload.x;
				element.y = action.payload.y;
			}
		},
		editElementName: (state, action) => {
			const element = state.elements.find(
				e => e.id === action.payload.id
			);
			if (element) {
				element.name = action.payload.name;
			}
		},
		deleteElement: (state, action) => {
			const id = action.payload;
			state.elements = state.elements.filter(e => e.id !== id);
		},
	},
});

export const {
	setElements,
	toggleGrid,
	addElement,
	dragElement,
	editElementName,
	deleteElement,
} = diagramsSlice.actions;

export const getAllElements = (state: RootState) => state.diagrams.elements;
export const getShowGrid = (state: RootState) => state.diagrams.showGrid;

export default diagramsSlice.reducer;
