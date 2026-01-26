const API_URL = "http://localhost:3001";

export async function register(email, password) {
	const res = await fetch(`${API_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.error || "Register failed");
	}

	// store tokenm
	localStorage.setItem("token", data.token);

	return data;
}
