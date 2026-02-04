import express from "express";
import jwt from "jsonwebtoken";
import { users } from "../data/users.js";

const router = express.Router();

const JWT_SECRET = "super_secret_key";

router.post("/register", (req, res) => {
	const { email, password, username, team } = req.body;

	if (!email || !password || !username || !team) {
		return res.status(400).json({ error: "Missing fields" });
	}

	const existingUser = users.find((u) => u.email === email);
	if (existingUser) {
		return res.status(400).json({ error: "User already exists" });
	}

	const newUser = {
		id: users.length + 1,
		email,
		password,
		username,
		team,
	};

	users.push(newUser);

	// auto-login after register
	const token = jwt.sign(
		{
			userId: newUser.id,
			email: newUser.email,
			username: newUser.username,
			team: newUser.team,
		},
		JWT_SECRET,
		{ expiresIn: "1h" }
	);

	res.status(201).json({ token });
});

router.post("/login", (req, res) => {
	const { email, password } = req.body;

	const user = users.find((u) => u.email === email && u.password === password);

	if (!user) {
		return res.status(401).json({ error: "Invalid information" });
	}

	console.log(users);

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
});

export default router;
