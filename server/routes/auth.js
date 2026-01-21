import express from "express";
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

export default router;
