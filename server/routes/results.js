import express from "express";
import Result from "../models/Result.js";

const router = express.Router();

console.log("Results router loaded");

router.get("/:raceId", async (req, res) => {
	try {
		const { raceId } = req.params;

		const result = await Result.findOne({ raceId });

		if (!result) {
			return res.status(404).json({ error: "Result not found" });
		}

		res.json(result);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message });
	}
});

export default router;
