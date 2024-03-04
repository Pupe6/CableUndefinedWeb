import { Socket, io } from "socket.io-client";
import { SocketNamespace } from "@/types/socket";

let socket: Socket;

function getSocket(namespace: SocketNamespace = SocketNamespace.INDEX) {
	if (!socket) {
		socket = io(process.env.NEXT_PUBLIC_API_URL + namespace);
	}
	console.log("socket", socket);
	socket.on("connect", () => {
		console.log("socket connected");
	});
	return socket;
}

export { getSocket };
