import { apiSlice } from "@/redux/api/api-slice";
import { Part } from "@/types/parts";
import { SocketEvent, SocketNamespace } from "@/types/socket";
import { getSocket } from "@/utils/socket";

const partsApiSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		addPart: build.mutation<void, { _id: string; part: Part }>({
			queryFn: ({ _id, part }) => {
				const socket = getSocket(SocketNamespace.DIAGRAMS);

				socket.emit(SocketEvent.ADD_PART, {
					token: localStorage.getItem("_token"),
					diagram: {
						_id,
					},
					part,
				});

				return new Promise((resolve, reject) => {
					socket.on(SocketEvent.ADD_PART, (data) => {
						if ("error" in data) {
							reject(data.error);
						} else {
							resolve({ data });
						}
					});
				});
			},
		}),
		updatePart: build.mutation<void, { _id: string; part: Partial<Part> }>({
			queryFn: ({ _id, part }) => {
				const socket = getSocket(SocketNamespace.DIAGRAMS);

				socket.emit(SocketEvent.UPDATE_PART, {
					token: localStorage.getItem("_token"),
					diagram: {
						_id,
					},
					part,
				});

				return new Promise((resolve, reject) => {
					socket.on(SocketEvent.UPDATE_PART, (data) => {
						if ("error" in data) {
							reject(data.error);
						} else {
							resolve({ data });
						}
					});
				});
			},
		}),
		removePart: build.mutation<void, { _id: string; partId: string }>({
			queryFn: ({ _id, partId }) => {
				const socket = getSocket(SocketNamespace.DIAGRAMS);

				socket.emit(SocketEvent.REMOVE_PART, {
					token: localStorage.getItem("_token"),
					diagram: {
						_id,
					},
					part: {
						id: partId,
					},
				});

				return new Promise((resolve, reject) => {
					socket.on(SocketEvent.REMOVE_PART, (data) => {
						if ("error" in data) {
							reject(data.error);
						} else {
							resolve({ data });
						}
					});
				});
			},
		}),
	}),
});

export const {
	useAddPartMutation,
	useUpdatePartMutation,
	useRemovePartMutation,
} = partsApiSlice;
