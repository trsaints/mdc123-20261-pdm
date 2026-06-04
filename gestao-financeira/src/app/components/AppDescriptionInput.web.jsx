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

export default function AppDescriptionInput({ form, setForm }) {
	return (
		<div style={{ marginBottom: 16 }}>
			<label style={{ fontSize: 14, color: colors.primaryText, marginBottom: 8, display: "block" }}>
				Descrição
			</label>
			<input
				type="text"
				value={form.description}
				onChange={(e) => setForm({ ...form, description: e.target.value })}
				placeholder="Digite a descrição"
				style={fieldStyle}
			/>
		</div>
	);
}
