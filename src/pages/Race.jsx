import { useState } from "react";
import { drivers } from "../data/drivers";
import PredictionRow from "../components/PredictionRow";

export default function Race() {
	const [prediction, setPrediction] = useState(Array(22).fill(null));

	const updatePrediction = (positionIndex, driverId) => {
		const next = [...prediction];
		next[positionIndex] = driverId;
		setPrediction(next);
	};

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
		</div>
	);
}
