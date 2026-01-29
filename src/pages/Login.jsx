import { useEffect, useState } from "react";
import { login } from "../services/api";
import { isLoggedIn } from "../services/auth";
import { useNavigate } from "react-router";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn()) {
			navigate("/");
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			await login(email, password);
			alert("Logged in successfully");
			navigate("/race/1");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="">
			<h1 className="">Login</h1>

			<input
				placeholder="Email..."
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<input
				placeholder="Password..."
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button className="">Login</button>

			{error && <p className="">{error}</p>}
		</form>
	);
}
