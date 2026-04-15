import { useState, useEffect } from "react";

function MyPredictions() {
	const [prediction, setPrediction] = useState(null);
	const [result, setResult] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = localStorage.getItem("token");
				// fetch prediction
				const predictionResult = await fetch(
					"http://localhost:3001/predictions/1",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const predictionData = await predictionResult.json();

				setPrediction(predictionData.positions);

				// fetch real race results
				const resultRes = await fetch("http://localhost:3001/results/2026-1");
				const resultData = await resultRes.json();

				setResult(resultData.positions);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const raceResults = () => {
		if (!prediction || !result) return null;

		return prediction.map((driver, index) => {
			const isCorrect = driver === result[index]?.driverId;

			return (
				<ul key={index}>
					<li className="">
						p{index + 1}: {isCorrect ? "✅" : "❌"}
					</li>
				</ul>
			);
		});
	};

	return (
		<div className="">
			<h1>My Predictions</h1>

			<div className="flex">
				<div className="">
					{prediction?.map((pre, i) => (
						<li key={i}>{pre} =&gt;</li>
					))}
				</div>

				<div className="">
					{result?.map((pos) => (
						<li key={pos.position}>{pos.driverId}</li>
					))}
				</div>
				{raceResults()}
			</div>
		</div>
	);
}

export default MyPredictions;
