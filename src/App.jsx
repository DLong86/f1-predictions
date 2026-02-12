import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Race from "./pages/Race";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Races from "./pages/Races";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/races"
					element={
						<ProtectedRoute>
							<Races />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/race/:id"
					element={
						<ProtectedRoute>
							<Race />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/leaderboard"
					element={
						<ProtectedRoute>
							<Leaderboard />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
