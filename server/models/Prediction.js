import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	year: { type: Number, required: true },
	round: { type: Number, required: true },

	p1: { type: String, required: true },
	p2: { type: String, required: true },
	p3: { type: String, required: true },

	pointsAwarderd: { type: Number, default: 0 },
});

const Prediction = mongoose.model("Prediction", predictionSchema);

export default Prediction;
