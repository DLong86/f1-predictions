export default function DriverSelect({ drivers, value, prediction, onChange }) {
	return (
		<select
			className=""
			value={value ?? ""}
			onChange={(e) => onChange(Number(e.target.value))}
		>
			<option value="">Select driver</option>

			{drivers.map((driver) => (
				<option
					key={driver.id}
					value={driver.id}
					disabled={prediction.includes(driver.id) && driver.id !== value}
				>
					{driver.name}
				</option>
			))}
		</select>
	);
}
