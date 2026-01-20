import { useEffect, useState } from "react";
import { fetchDrivers, fetchPrediction, savePrediction } from "../services/api";
import PredictionRow from "../components/PredictionRow";
import { useParams } from "react-router";

export default function Race() {
	const { id } = useParams();
	const raceId = Number(id);

	const [drivers, setDrivers] = useState([]);
	const [prediction, setPrediction] = useState(Array(10).fill(null));

	useEffect(() => {
		fetchDrivers().then((data) => {
			console.log(data);
			setDrivers(data);
		});

		fetchPrediction(raceId).then((data) => {
			if (data) {
				console.log(data);

				setPrediction(data.positions);
			}
		});
	}, [raceId]);

	const handleSave = () => {
		savePrediction({
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
			<h1 className="text-2xl font-bold mb-4">Race Prediction</h1>

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
