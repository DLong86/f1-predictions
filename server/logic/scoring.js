import { predictions } from "../data/predictions.js";
import { users } from "../data/users.js";

export function scorePrediction(predictionPodium, resultPodium) {
	let score = 0;

	if (predictionPodium[0] === resultPodium[0]) score += 3;
	if (predictionPodium[1] === resultPodium[0]) score += 2;
	if (predictionPodium[2] === resultPodium[0]) score += 1;

	return score;
}

export function processRaceResult(raceId, resultPodium) {
	predictions.forEach((prediction) => {
		if (prediction.raceId === raceId) {
			const score = scorePrediction(prediction.podium, resultPodium);

			// Save score to prediction
			prediction.score = score;

			// Add score to user
			const user = users.find((u) => u.id === prediction.userId);

			if (user) {
				user.totalPoints += score;
			}
		}
	});
}
