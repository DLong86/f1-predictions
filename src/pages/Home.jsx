import { Link } from "react-router";

export default function Home() {
	return (
		<div className="">
			<Link to="/login" className="">
				Make Prediction - ENTER CIRCUIT -{" "}
			</Link>
		</div>
	);
}
