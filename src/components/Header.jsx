import { logout, isLoggedIn } from "../services/auth";
import { useNavigate } from "react-router";

export default function Header() {
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<header className="">
			<h1 className="">Race Predictor</h1>

			{isLoggedIn() && (
				<button onClick={handleLogout} className="">
					Log out
				</button>
			)}
		</header>
	);
}
