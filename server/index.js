import express from "express";
import cors from "cors";
import { drivers } from "./data/drivers.js";
import { races2026 } from "./data/races.js";
import { predictions } from "./data/predictions.js";
import authRoutes from "./routes/auth.js";
import { authMiddleware } from "./middleware/auth.js";

const JWT_SECRET = "super_secret_key";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/drivers", (req, res) => {
	res.json(drivers);
});

app.get("/races", (req, res) => {
	res.json(races2026);
});

app.post("/predictions", authMiddleware, (req, res) => {
	const userId = req.user.userId;
	const { raceId, positions } = req.body;

	if (!raceId || !positions) {
		return res.status(400).json({ error: "Invalid payload" });
	}

	const existingIndex = predictions.findIndex(
		(p) => p.userId === userId && p.raceId === raceId
	);

	if (existingIndex !== -1) {
		predictions[existingIndex].positions = positions;
	} else {
		predictions.push({ userId, raceId, positions });
	}

	res.status(201).json({ message: "Prediction saved" });
});

app.get("/predictions/:raceId", authMiddleware, (req, res) => {
	const userId = req.user.userId;
	const raceId = Number(req.params.raceId);

	const prediction = predictions.find(
		(p) => p.userId === userId && p.raceId === raceId
	);

	if (!prediction) {
		return res.status(404).json({ error: "Prediction not found" });
	}

	res.json(prediction);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
