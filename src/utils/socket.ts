import { Socket, io } from "socket.io-client";
import { SocketNamespace } from "@/types/socket";

let socket: Socket;

function getSocket(namespace: SocketNamespace = SocketNamespace.INDEX) {
	if (!socket) {
		socket = io(import.meta.env.VITE_API_URL + namespace);
	}
	socket.on("connect", () => {
		console.log("socket connected");
	});
	socket.on("error", (error) => {
		console.log("socket error", error);
	});
	return socket;
}

export { getSocket };
