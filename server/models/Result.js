import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
	raceId: { type: String, required: true, unique: true },
	season: Number,
	round: Number,
	raceName: String,
	circuit: String,
	date: Date,
	positions: [
		{
			position: Number,
			driverId: String,
			code: String,
			name: String,
		},
	],
	raw: Object,
	syncdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Result", resultSchema);
