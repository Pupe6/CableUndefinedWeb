import { apiSlice } from "@/redux/api/api-slice";
import { SocketEvent, SocketNamespace } from "@/types/socket";
import { getSocket } from "@/utils/socket";

export const diagramsApiSlice = apiSlice.injectEndpoints({
	endpoints: build => ({
		getDiagrams: build.query<void, void>({
			queryFn: () => {
				const socket = getSocket(SocketNamespace.DIAGRAMS);

				socket.emit(SocketEvent.GET_DIAGRAMS, {
					token: localStorage.getItem("_token"),
				});

				return new Promise((resolve, reject) => {
					socket.on(SocketEvent.GET_DIAGRAMS, (data: any) => {
						if ("error" in data) {
							reject(data.error);
						} else {
							resolve({
								data: data.diagrams,
							});
						}
					});
				});
			},
		}),
		getDiagram: build.query({
			query: (id: string) => `diagrams/${id}`,
		}),
		createDiagram: build.mutation({
			queryFn: (body: { name: string }) => {
				const socket = getSocket(SocketNamespace.DIAGRAMS);

				socket.emit(SocketEvent.CREATE_DIAGRAM, {
					token: localStorage.getItem("_token"),
					name: body.name,
				});

				return new Promise((resolve, reject) => {
					socket.on(SocketEvent.CREATE_DIAGRAM, (data: any) => {
						if ("error" in data) {
							reject(data.error);
						} else {
							resolve({
								data: data.diagram,
							});
						}
					});
				});
			},
		}),
		updateDiagram: build.mutation({
			queryFn: (body: { id: string; name: string }) => {
				const socket = getSocket(SocketNamespace.DIAGRAMS);

				socket.emit(SocketEvent.UPDATE_DIAGRAM, {
					token: localStorage.getItem("_token"),
					diagram: {
						_id: body.id,
					},
					update: {
						name: body.name,
					},
				});

				return new Promise((resolve, reject) => {
					socket.on(SocketEvent.UPDATE_DIAGRAM, (data: any) => {
						if ("error" in data) {
							reject(data.error);
						} else {
							resolve({
								data: data.diagram,
							});
						}
					});
				});
			},
		}),
		deleteDiagram: build.mutation({
			queryFn: (id: string) => {
				const socket = getSocket(SocketNamespace.DIAGRAMS);

				socket.emit(SocketEvent.DELETE_DIAGRAM, {
					token: localStorage.getItem("_token"),
					diagram: {
						_id: id,
					},
				});

				return new Promise((resolve, reject) => {
					socket.on(SocketEvent.DELETE_DIAGRAM, (data: any) => {
						if ("error" in data) {
							reject(data.error);
						} else {
							resolve({
								data: data.diagram,
							});
						}
					});
				});
			},
		}),
	}),
});
