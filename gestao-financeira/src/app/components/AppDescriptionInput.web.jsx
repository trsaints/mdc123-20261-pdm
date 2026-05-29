export default function AppDescriptionInput({ form, setForm }) {
	return (
		<div style={{ marginBottom: 12 }}>
			<label style={{ fontSize: 16, color: "#1F1F1F", marginBottom: 4, display: "block" }}>
				Descrição
			</label>
			<input
				type="text"
				value={form.description}
				onChange={(e) => setForm({ ...form, description: e.target.value })}
				placeholder="Digite a descrição"
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
