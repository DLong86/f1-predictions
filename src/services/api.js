const API_URL = "http://localhost:3001";

export async function fetchDrivers() {
	const res = await fetch(`${API_URL}/drivers`);

	if (!res.ok) {
		throw new Error("Failed to fetch drivers");
	}

	return res.json();
}

export async function login(email, password) {
	const res = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.error || "Login failed");
	}

	localStorage.setItem("token", data.token);

	return data;
}

export async function savePrediction(prediction) {
	const token = localStorage.getItem("token");

	const res = await fetch(`${API_URL}/predictions`, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(prediction),
	});

	if (!res.ok) {
		throw new Error("Failed to save prediction");
	}

	return res.json();
}

export async function fetchPrediction(raceId) {
	const token = localStorage.getItem("token");

	const res = await fetch(`${API_URL}/predictions/${raceId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (res.status === 404) {
		return null;
	}

	if (!res.ok) {
		throw new Error("Failed to fetch prediction");
	}

	return res.json();
}
