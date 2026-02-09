import express from "express";
import Result from "../models/Result.js";
import { fetchRaceResult } from "../services/resultsApiService.js";

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

export default router;
