import Prediction from "../models/Prediction.js";
import User from "../models/User.js";

export function scorePrediction(predictionPodium, resultPodium) {
	let score = 0;

	if (predictionPodium[0] === resultPodium[0]) score += 3;
	if (predictionPodium[1] === resultPodium[0]) score += 2;
	if (predictionPodium[2] === resultPodium[0]) score += 1;

	return score;
}

export async function processRaceResult(raceId, resultPositions) {
	// Extract actual podium from result
	const resultPodium = [
		resultPositions[0]?.code,
		resultPositions[1]?.code,
		resultPositions[2]?.code,
	];

	// 1. Find predictions for this race
	const racePredictions = await Prediction.find({ raceId });

	for (const prediction of racePredictions) {
		const predictionPodium = [prediction.p1, prediction.p2, prediction.p3];

		const score = scorePrediction(predictionPodium, resultPodium);

		// 2. Save score to prediction
		prediction.pointsAwarded = score;
		await prediction.save();

		// 3. Add user total points
		await User.findByIdAndUpdate(prediction.userId, {
			$inc: { totalPoints: score },
		});
	}
}
