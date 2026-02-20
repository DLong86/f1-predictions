import express from "express";
import { users } from "../data/users.js";

const router = express.Router();

router.get("/", (req, res) => {
	const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

	res.json(sortedUsers);
});

export default router;
