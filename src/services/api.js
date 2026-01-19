const API_URL = "http://localhost:3001";

export async function fetchDrivers() {
	const res = await fetch(`${API_URL}/drivers`);

	if (!res.ok) {
		throw new Error("Failed to fetch drivers");
	}

	return res.json();
}

export async function savePrediction(data) {
	const res = await fetch(`${API_URL}/predictions`, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error("Failed to save prediction");
	}

	return res.json();
}

export async function fetchPrediction(raceId) {
	const res = await fetch(`${API_URL}/predictions/${raceId}`);
	if (!res.ok) {
		throw new Error("Failed to fetch prediction");
	}
	return res.json();
}
