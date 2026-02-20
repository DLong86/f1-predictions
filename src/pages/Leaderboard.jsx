import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/api";

function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState([]);

	useEffect(() => {
		async function fetchLeaderboard() {
			const data = await getLeaderboard();
			setLeaderboard(data);
		}

		fetchLeaderboard();
	}, []);

	return (
		<div className="">
			<h1 className="">Leaderboard</h1>

			{leaderboard.map((user, index) => (
				<div key={user.id} className="">
					<p className="">
						#{index + 1} - {user.username} - {user.totalPoints} pts
					</p>
				</div>
			))}
		</div>
	);
}

export default Leaderboard;
