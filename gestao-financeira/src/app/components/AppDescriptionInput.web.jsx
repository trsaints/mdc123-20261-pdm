import { colors } from "../../constants/colors";

export default function AppDescriptionInput({ form, setForm }) {
	return (
		<div style={{ marginBottom: 16 }}>
			<label style={{ fontSize: 15, color: colors.primaryText, marginBottom: 8, display: "block" }}>
				Descrição
			</label>
			<input
				type="text"
				value={form.description}
				onChange={(e) => setForm({ ...form, description: e.target.value })}
				placeholder="Digite a descrição"
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
