import React from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../services/auth";

function Dashboard() {
	const navigate = useNavigate();
	// const userEmail = localStorage.getItem("userEmail");
	const user = getUserFromToken();

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userEmail");
		navigate("/");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md max-w-md">
				<h1 className="text-2xl font-bold mb-2">Dashboard</h1>
				<p className="text-gray-600 mb-6">
					Welcome{" "}
					<span className="semibold text-md text-black">{user.username}</span>
				</p>

				<div className="flex flex-col gap-3">
					<button
						onClick={() => navigate("/races")}
						className="bg-black text-white py-2 rounded cursor-pointer"
					>
						View Races
					</button>

					<button
						onClick={() => navigate("/my-predictions")}
						className="border border-black py-2 rounded cursor-pointer"
					>
						My Predictions
					</button>

					<button className="bg-gray-200 text-gray-500 py-2 rounded cursor-not-allowed">
						Leaderboard (Coming soon)
					</button>

					<hr />

					<button
						onClick={handleLogout}
						className="text-red-600 py-2 cursor-pointer border-1 border-gray-500 rounded"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
