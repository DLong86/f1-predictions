import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	raceId: { type: String, required: true },

	positions: {
		type: [Number],
		required: true,
	},

	pointsAwarded: { type: Number, default: 0 },
});

const Prediction = mongoose.model("Prediction", predictionSchema);

export default Prediction;
