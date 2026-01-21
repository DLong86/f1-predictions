import express from "express";
import jwt from "jsonwebtoken";
import { users } from "../data/users.js";

const router = express.Router();

router.post("/register", (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
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
	};

	users.push(newUser);

	res.status(201).json({ message: "User created" });
});

router.post("/login", (req, res) => {
	const { email, password } = req.body;

	const user = users.find((u) => u.email === email && u.password === password);

	if (!user) {
		return res.status(401).json({ error: "Invalid information" });
	}

	console.log(users);

	const token = jwt.sign(
		{ userId: user.id, email: user.email },
		"super_secret_key",
		{ expiresIn: "1h" }
	);

	res.json({ token });
});

export default router;
