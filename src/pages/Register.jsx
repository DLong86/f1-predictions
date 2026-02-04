import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [username, setUsername] = useState("");
	const [team, setTeam] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			await register(email, password, username, team);
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

			<select
				value={team}
				onChange={(e) => setTeam(e.target.value)}
				className="bg-black text-white border p-2"
			>
				<option value="">Select favourite team</option>
				<option value="mercedes">Mercedes</option>
				<option value="ferrari">Ferrari</option>
				<option value="mclaren">Mclaren</option>
				<option value="redbull">Redbull</option>
				<option value="williams">Williams</option>
				<option value="aston">Aston Martin</option>
				<option value="alpine">Alpine</option>
				<option value="haas">Haas</option>
				<option value="racingbulls">Racing bulls</option>
				<option value="audi">Audi</option>
				<option value="cadillac">Cadillac</option>
			</select>

			<button>Register</button>

			{error && <p>{error}</p>}
		</form>
	);
}
