import DriverSelect from "./DriverSelect";

export default function PredictionRow({
	position,
	drivers,
	selectedDriverId,
	onChange,
}) {
	return (
		<div className="flex items-center gap-4 mb-3">
			<span className="w-8 font-bold">P{position}</span>

			<DriverSelect
				drivers={drivers}
				value={selectedDriverId}
				onChange={onChange}
			/>
		</div>
	);
}
