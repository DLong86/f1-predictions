import express from "express";
import Result from "../models/Result.js";
import { fetchRaceResult } from "../services/resultsApiService.js";
import { processRaceResult } from "../logic/scoring.js";
import results from "../data/results.js";

const router = express.Router();

// ADMIN ONLY!!!! (protectr later)
router.post("/sync-results/:season/:round", async (req, res) => {
	try {
		const { season, round } = req.params;

		const resultData = await fetchRaceResult(season, round);

		const raceId = `${season}-${round}`;

		const saved = await Result.findOneAndUpdate(
			{ raceId },
			{
				raceId,
				...resultData,
			},
			{ upsert: true, new: true }
		);

		res.json({
			success: true,
			message: "Result synced",
			result: saved,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err.message,
		});
	}
});

router.post("/", (req, res) => {
	const { raceId, podium } = req.body;

	// Save result
	results.push({ raceId, podium });

	// Process scoring
	processRaceResult(raceId, podium);

	res.json({ message: "Results processed successfully" });
});

export default router;
