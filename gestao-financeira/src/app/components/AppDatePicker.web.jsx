import { colors } from "../../constants/colors";

const fieldStyle = {
	height: 48,
	width: "100%",
	padding: "0 16px",
	borderRadius: 12,
	border: `1px solid ${colors.border}`,
	backgroundColor: colors.surface,
	color: colors.primaryText,
	fontSize: 16,
	boxSizing: "border-box",
	outline: "none",
};

export default function AppDatePicker({ form, setForm }) {
	const dateValue = form.date instanceof Date ? form.date : new Date(form.date);
	const value = dateValue.toISOString().slice(0, 10);

	return (
		<div style={{ marginBottom: 16 }}>
			<label style={{ fontSize: 14, color: colors.primaryText, marginBottom: 8, display: "block" }}>
				Data
			</label>
			<input
				type="date"
				value={value}
				onChange={(e) => setForm({ ...form, date: new Date(e.target.value) })}
				style={fieldStyle}
			/>
		</div>
	);
}
