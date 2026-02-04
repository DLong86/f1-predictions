const API_URL = "http://localhost:3001";
import { jwtDecode } from "jwt-decode";

export async function register(email, password, username, team) {
	const res = await fetch(`${API_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password, username, team }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.error || "Register failed");
	}

	// store tokenm
	localStorage.setItem("token", data.token);

	return data;
}

export function isLoggedIn() {
	return Boolean(localStorage.getItem("token"));
}

export function getUserFromToken() {
	const token = localStorage.getItem("token");
	if (!token) return null;

	try {
		return jwtDecode(token);
	} catch {
		return null;
	}
}

export function logout() {
	localStorage.removeItem("token");
}
