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
	// Extract actual podium from result
	const resultTop10 = resultPositions
		.slice(0, 10)
		.map((position) => position.code);

	// 1. Find predictions for this race
	const racePredictions = await Prediction.find({ raceId });

	for (const prediction of racePredictions) {
		const predictionPositions = prediction.positions;

		const score = scorePrediction(predictionPositions, resultTop10);

		// 2. Save score to prediction
		prediction.pointsAwarded = score;
		await prediction.save();

		// 3. Add user total points
		await User.findByIdAndUpdate(prediction.userId, {
			$inc: { totalPoints: score },
		});
	}
}
