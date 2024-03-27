import { createSlice } from "@reduxjs/toolkit";
import { diagramsApiSlice } from "./diagrams-api-slice";
import type { RootState } from "@/redux/store";

import type { Diagram } from "@/types/diagrams";

interface DiagramsState {
	diagrams: Diagram[];
}

const initialState: DiagramsState = {
	diagrams: [],
};

export const diagramsSlice = createSlice({
	name: "diagrams",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			diagramsApiSlice.endpoints.getDiagrams.matchFulfilled,
			(state, action) => {
				state.diagrams = action.payload;
			}
		);
	},
});

export const {} = diagramsSlice.actions;

export const selectDiagrams = (state: RootState) => state.diagrams.diagrams;
export const selectDiagramById = (state: RootState, id: string) =>
	state.diagrams.diagrams.find((d) => d._id === id);

export default diagramsSlice.reducer;
