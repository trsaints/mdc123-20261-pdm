export default function AppDatePicker({ form, setForm }) {
	const dateValue = form.date instanceof Date ? form.date : new Date(form.date);
	const value = dateValue.toISOString().slice(0, 10);

	return (
		<div style={{ marginBottom: 12 }}>
			<label style={{ fontSize: 16, color: "#1F1F1F", marginBottom: 4, display: "block" }}>
				Data
			</label>
			<input
				type="date"
				value={value}
				onChange={(e) => setForm({ ...form, date: new Date(e.target.value) })}
				style={{
					height: 40,
					paddingLeft: 16,
					borderColor: "#BFBFBF",
					borderWidth: 1,
					borderRadius: 8,
					borderStyle: "solid",
					width: "100%",
					boxSizing: "border-box",
					fontSize: 16,
				}}
			/>
		</div>
	);
}
