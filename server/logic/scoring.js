import Prediction from "../models/Prediction.js";
import User from "../models/User.js";

export function scorePrediction(predictionPodium, resultPodium) {
	let score = 0;

	for (let i = 0; i < 10; i++) {
		if (predictionPodium[i] === resultPodium[i]) {
			score += 1;
		}
	}

	return score;
}

export async function processRaceResult(raceId, resultPositions) {
	console.log("raceId received:", raceId, typeof raceId);

	const resultTop10 = resultPositions
		.slice(0, 10)
		.map((position) => position.driverId);

	// 1. Find predictions for this race
	const racePredictions = await Prediction.find({
		raceId: raceId.split("-")[1],
	});

	console.log("Predictions found:", racePredictions.length);

	for (const prediction of racePredictions) {
		const predictionPositions = prediction.positions;

		console.log("Prediction:", predictionPositions);
		console.log("Result:", resultTop10);

		const score = scorePrediction(predictionPositions, resultTop10);

		prediction.pointsAwarded = score;
		await prediction.save();

		await User.findByIdAndUpdate(prediction.userId, {
			$inc: { totalPoints: score },
		});
	}
}
