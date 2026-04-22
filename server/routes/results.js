import express from "express";
import Result from "../models/Result.js";
import { processRaceResult } from "../logic/scoring.js";
import { fetchRaceResult } from "../services/resultsApiService.js";

const router = express.Router();

console.log("Results router loaded");

router.get("/:raceId", async (req, res) => {
	try {
		const { raceId } = req.params;

		const result = await Result.findOne({ raceId });

		if (!result) {
			return res.status(404).json({ error: "Result not found" });
		}

		// TEMP: RUN SCORING!!!!!!!!!!!
		await processRaceResult(result.raceId, result.positions);

		res.json(result);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message });
	}
});

router.post("/fetch/:raceId", async (req, res) => {
	try {
		const { raceId } = req.params;

		const [season, round] = raceId.split("-");
		const apiResults = await fetchRaceResult(season, round);

		const formattedPositions = apiResults.positions.map((driver, index) => ({
			position: String(index + 1),
			driverId: driver.driverId,
		}));

		const result = await Result.findOneAndUpdate(
			{ raceId },
			{
				raceId,
				positions: formattedPositions,
			},
			{ upsert: true, new: true }
		);

		await processRaceResult(result.raceId, result.positions);

		res.json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
});

export default router;
