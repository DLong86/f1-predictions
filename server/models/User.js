import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unigue: true },
	password: { type: String, required: true },
	username: { type: String, required: true },
	team: { type: String, required: true },
	totalPoints: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);

export default User;
