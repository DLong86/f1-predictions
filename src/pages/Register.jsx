import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			await register(email, password, username);
			navigate("/dashboard");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="">
			<h1 className="">Register</h1>

			<input
				placeholder="email..."
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<input
				type="password"
				placeholder="password..."
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<input
				placeholder="Username..."
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>

			<button>Register</button>

			{error && <p>{error}</p>}
		</form>
	);
}
