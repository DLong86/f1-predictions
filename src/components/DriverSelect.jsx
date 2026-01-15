export default function DriverSelect({ drivers, value, onChange }) {
	return (
		<select
			className=""
			value={value ?? ""}
			onChange={(e) => onChange(Number(e.target.value))}
		>
			<option value="">Select driver</option>

			{drivers.map((driver) => (
				<option key={driver.id} value={driver.id}>
					{driver.name}
				</option>
			))}
		</select>
	);
}
