import { useEffect, useState } from "react";
import { fetchDrivers } from "../services/api";
import PredictionRow from "../components/PredictionRow";

export default function Race() {
	const [drivers, setDrivers] = useState([]);
	const [prediction, setPrediction] = useState(Array(10).fill(null));

	useEffect(() => {
		fetchDrivers().then((data) => {
			console.log(data);
			setDrivers(data);
		});
	}, []);

	const updatePrediction = (positionIndex, driverId) => {
		const next = [...prediction];
		next[positionIndex] = driverId;
		setPrediction(next);
	};

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
		</div>
	);
}
