import { Link } from "react-router";

export default function Home() {
	return (
		<div className="">
			<h1 className="">F1 Predictor</h1>

			<Link to="/race/1" className="">
				Make Prediction - ENTER CIRCUIT -{" "}
			</Link>
		</div>
	);
}
