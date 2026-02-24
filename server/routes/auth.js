import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const JWT_SECRET = "super_secret_key";

router.post("/register", async (req, res) => {
	try {
		const { email, password, username, team } = req.body;

		if (!email || !password || !username || !team) {
			return res.status(400).json({ error: "Missing fields" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}

		const newUser = await User.create({
			email,
			password,
			username,
			team,
		});

		const token = jwt.sign(
			{
				userId: newUser._id,
				email: newUser.email,
				username: newUser.username,
				team: newUser.team,
			},
			JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.status(201).json({ token });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = User.findOne({ email, password });

		if (!user) {
			return res.status(401).json({ error: "Invalid information" });
		}

		const token = jwt.sign(
			{
				userId: user.id,
				email: user.email,
				username: user.username,
				team: user.team,
			},
			"super_secret_key",
			{ expiresIn: "1h" }
		);

		res.json({ token });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
