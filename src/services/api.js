const API_URL = "http://localhost:3001";

export async function fetchDrivers() {
	const res = await fetch(`${API_URL}/drivers`);

	if (!res.ok) {
		throw new Error("Failed to fetch drivers");
	}

	return res.json();
}
