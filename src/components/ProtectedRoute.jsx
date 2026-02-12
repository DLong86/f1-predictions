import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../services/auth";

export default function ProtectedRoute({ children }) {
	const loggedIn = isLoggedIn();
	return loggedIn ? children : <Navigate to="/login" replace />;
}
