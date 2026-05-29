import { colors } from "../../constants/colors";

export default function AppDatePicker({ form, setForm }) {
	const dateValue = form.date instanceof Date ? form.date : new Date(form.date);
	const value = dateValue.toISOString().slice(0, 10);

	return (
		<div style={{ marginBottom: 16 }}>
			<label style={{ fontSize: 15, color: colors.primaryText, marginBottom: 8, display: "block" }}>
				Data
			</label>
			<input
				type="date"
				value={value}
				onChange={(e) => setForm({ ...form, date: new Date(e.target.value) })}
				style={{
					height: 48,
					paddingLeft: 16,
					borderColor: colors.secondaryText,
					borderWidth: 1,
					borderRadius: 12,
					borderStyle: "solid",
					width: "100%",
					boxSizing: "border-box",
					fontSize: 16,
					color: colors.primaryText,
				}}
			/>
		</div>
	);
}
