import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import process from "process";

import { drivers } from "./data/drivers.js";
import { races2026 } from "./data/races.js";
import Prediction from "./models/Prediction.js";
import leaderboardRoutes from "./routes/Leaderboard.js";
import authRoutes from "./routes/auth.js";
import { authMiddleware } from "./middleware/auth.js";
import adminResultsRoutes from "./routes/adminResults.js";

dotenv.config();

const JWT_SECRET = "super_secret_key";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/admin", adminResultsRoutes);
app.use("/leaderboard", leaderboardRoutes);

app.get("/drivers", (req, res) => {
	res.json(drivers);
});

app.get("/races", (req, res) => {
	res.json(races2026);
});

app.post("/predictions", authMiddleware, async (req, res) => {
	try {
		const { raceId, positions } = req.body;

		if (!raceId || !positions) {
			return res.status(400).json({ error: "Invalid payload" });
		}
		// update if exists/ create if noit
		const prediction = await Prediction.findOneAndUpdate(
			{ userId: req.user.userId, raceId },
			{ positions },
			{ upsert: true, new: true }
		);

		res.json(prediction);

		res.status(201).json({ message: "Prediction saved to mongo" });
	} catch (err) {
		console.error("ERROR:", err);
		res.status(500).json({ error: err.message });
	}
});

app.get("/predictions/:raceId", authMiddleware, async (req, res) => {
	try {
		const userId = req.user.userId;
		const raceId = req.params.raceId;

		const prediction = await Prediction.findOne({
			userId,
			raceId,
		});

		if (!prediction) {
			return res.status(404).json({ error: "Prediction not found" });
		}

		res.json(prediction);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

const PORT = 3001;

async function startServer() {
	try {
		await mongoose.connect(process.env.MONGO_URI);

		console.log("MongoDB connected");

		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error("Mongo connection failed:", err);
		process.exit(1);
	}
}

startServer();
