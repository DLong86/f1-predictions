import express from "express";
import cors from "cors";
import { drivers } from "./data/drivers.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/drivers", (req, res) => {
	res.json(drivers);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
