const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export async function fetchRaceResult(season, round) {
	const url = `${BASE_URL}/${season}/${round}/results.json`;

	const res = await fetch(url);

	const text = await res.text();

	// debug log
	console.log("Ergast raw response:", text.slice(0, 300));

	let data;
	try {
		data = JSON.parse(text);
	} catch {
		throw new Error("API did not return JSON");
	}

	const race = data.MRData.RaceTable.Races[0];

	if (!race) {
		throw new Error("No race data found");
	}

	// Normalise
	return {
		season: Number(season),
		round: Number(round),
		raceName: race.raceName,
		circuit: race.Circuit.circuitName,
		date: race.date,
		positions: race.Results.map((r) => ({
			position: Number(r.position),
			driverId: r.Driver.driverId,
			code: r.Driver.code,
			name: `${r.Driver.givenName} ${r.Driver.familyName}`,
		})),
		raw: race,
	};
}
