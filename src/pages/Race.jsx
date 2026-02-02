import { useEffect, useState } from "react";
import { fetchDrivers, fetchPrediction, savePrediction } from "../services/api";
import PredictionRow from "../components/PredictionRow";
import { useParams } from "react-router";
import { isLoggedIn } from "../services/auth.js";
import { useNavigate } from "react-router";
import { races2026 } from "../../server/data/races.js";

export default function Race() {
	const { id } = useParams();
	const raceId = Number(id);
	const navigate = useNavigate();

	const [drivers, setDrivers] = useState([]);
	const [prediction, setPrediction] = useState(Array(10).fill(null));

	const race = races2026.find((race) => race.id === raceId);

	useEffect(() => {
		fetchDrivers().then((data) => {
			console.log(data);
			setDrivers(data);
		});

		fetchPrediction(raceId).then((data) => {
			if (data) {
				setPrediction(data.positions);
			} else {
				setPrediction(Array(10).fill(null));
			}
		});
	}, [raceId]);

	useEffect(() => {
		if (!isLoggedIn()) {
			navigate("/login");
		}
	}, []);

	const handleSave = async () => {
		const token = localStorage.getItem("token");
		console.log("SAVE TOKEN:", token);

		if (!token) {
			alert("You must be logged in to save predictions");
			return;
		}

		await savePrediction({
			raceId,
			positions: prediction,
		});
	};

	const updatePrediction = (positionIndex, driverId) => {
		const next = [...prediction];
		next[positionIndex] = driverId;
		setPrediction(next);
	};

	console.log("prediction:", prediction);

	if (drivers.length === 0) {
		return <div className="p-6">Loading drivers...</div>;
	}

	return (
		<div className="min-h-screen bg-black text-white p-6">
			{race && (
				<div className="mb-4">
					<h1 className="text-2xl font-bold">{race.name}</h1>
					<h3 className="text-gray-500 text-xl">{race.circuit}</h3>
				</div>
			)}

			{prediction.map((driverId, index) => (
				<PredictionRow
					key={index}
					position={index + 1}
					drivers={drivers}
					selectedDriverId={driverId}
					onChange={(id) => updatePrediction(index, id)}
				/>
			))}

			<button
				onClick={handleSave}
				className="mt-6 bg-green-600 px-4 py-2 rounded"
			>
				Save Prediction
			</button>
		</div>
	);
}
