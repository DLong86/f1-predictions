import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Race from "./pages/Race";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
	return (
		<>
			<h1 className="">F1 Predictions</h1>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/race/:id" element={<Race />} />
				<Route path="/leaderboard" element={<Leaderboard />} />
			</Routes>
		</>
	);
}

export default App;
