import { useEffect, useState } from "react";
import { fetchRaces } from "../services/api";
import { useNavigate } from "react-router-dom";

function Races() {
	const [races, setRaces] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchRaces().then(setRaces);
	}, []);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">2026 Season</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{races.map((race) => (
					<div
						key={race.id}
						onClick={() => navigate(`/race/${race.id}`)}
						className="cursor-pointer border rounded-lg p-4 shadow hover:shadow-lg transition"
					>
						<h2 className="font-semibold">{race.name}</h2>
						<p className="text-sm text-gray-500">{race.circuit}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Races;
