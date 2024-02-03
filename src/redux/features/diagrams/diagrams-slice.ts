import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";
import * as WokwiElements from "@wokwi/elements";

type WokwiElement<T> = Partial<T> & React.ClassAttributes<T>;

type WokwiElementMap = {
	[K in keyof typeof WokwiElements]: WokwiElement<(typeof WokwiElements)[K]>;
};

interface DiagramsElement {
	id: string;
	x: number;
	y: number;
	name: string;
	type: keyof WokwiElementMap;
}

interface DiagramsState {
	elements: DiagramsElement[];
}

const initialState: DiagramsState = {
	elements: [],
};

export const diagramsSlice = createSlice({
	name: "diagrams",
	initialState,
	reducers: {
		setElements: (state, action) => {
			state.elements = action.payload;
		},
		addElement: (state, action) => {
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
			state.elements = state.elements.filter(
				e => e.id !== action.payload
			);
		},
	},
});

export const { setElements, addElement, editElementName, deleteElement } =
	diagramsSlice.actions;
