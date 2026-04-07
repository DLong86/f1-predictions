import { useState, useEffect } from "react";

function MyPredictions() {
	const [prediction, setPrediction] = useState(null);
	const result = ["russell", "antonelli", "leclerc"];

	useEffect(() => {
		const fetchPrediction = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await fetch("http://localhost:3001/predictions/1", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await res.json();

				setPrediction(data.positions);
			} catch (error) {
				console.error(error);
			}
		};

		fetchPrediction();
	}, []);

	const raceResults = () => {
		return prediction?.map((driver, index) => {
			const isCorrect = driver === result[index];

			return (
				<p key={index}>
					p{index + 1}: {isCorrect ? "✅" : "❌"}
				</p>
			);
		});
	};

	return (
		<div className="">
			<h1>My Predictions</h1>

			<div className="">
				{prediction?.map((pre, i) => (
					<li key={i}>{pre} =&gt;</li>
				))}

				{result.map((res, i) => (
					<li key={i}>{res}</li>
				))}
			</div>

			{raceResults()}
		</div>
	);
}

export default MyPredictions;
