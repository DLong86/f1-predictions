import { logout, isLoggedIn } from "../services/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function Header() {
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<header className="flex items-center">
			<Link to="/" className="">
				<h1 className="text-4xl">Race Predictor</h1>
			</Link>

			{isLoggedIn() ? (
				<button onClick={handleLogout} className="">
					Log out
				</button>
			) : (
				<div className="flex gap-4 pl-4">
					<Link to="/login" className="">
						LogIn
					</Link>
					<Link to="/register" className="">
						Signup
					</Link>
				</div>
			)}
		</header>
	);
}
