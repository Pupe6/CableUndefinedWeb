import { useNavigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/redux/hooks";
import { selectIsAuthenticated } from "@/redux/features/auth/auth-handler-slice";

export function LoggedInLayout() {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const navigate = useNavigate();

	return <>{isAuthenticated ? navigate(-1) : <Outlet />}</>;
}
