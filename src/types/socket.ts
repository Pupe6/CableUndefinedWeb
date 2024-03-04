enum SocketEvent {
	LOGIN = "auth:login",
	LOGOUT = "auth:logout",
	REGISTER = "auth:register",
	PREDICTION = "prediction",
	USERUPDATE = "users:update",
	USERDELETE = "users:delete",
	GETDIAGRAMS = "diagrams:get",
	CREATEDIAGRAM = "diagrams:create",
	DELETEDIAGRAM = "diagrams:delete",
}

enum SocketNamespace {
	AUTH = "/auth",
	USERS = "/users",
	INDEX = "/",
	DIAGRAMS = "/diagrams",
}

export { SocketEvent, SocketNamespace };
