import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL as string,
});

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ["Diagrams"],
	endpoints: () => ({}),
});
