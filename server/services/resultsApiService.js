const BASE_URL = "https://ergast.com/api/f1";

export async function fetchRaceResult(season, round) {
	const url = `${BASE_URL}/${round}/results.json`;

	const res = await fetch(url);
	if (!res.ok) {
		throw new Error("Failed to fetch race result");
	}

	const data = await res.json();

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
