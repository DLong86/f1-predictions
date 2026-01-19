import express from "express";
import cors from "cors";
import { drivers } from "./data/drivers.js";
import { predictions } from "./data/predictions.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/drivers", (req, res) => {
	res.json(drivers);
});

app.post("/predictions", (req, res) => {
	const { raceId, positions } = req.body;

	if (!raceId || !positions) {
		return res.status(400).json({ error: "Invalid payload" });
	}

	predictions.push({
		raceId,
		positions,
	});

	res.status(201).json({ message: "Prediction saved" });
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
