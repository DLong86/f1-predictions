import { useState } from "react";
import { login } from "../services/api";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			await login(email, password);
			alert("Logged in successfully");
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
