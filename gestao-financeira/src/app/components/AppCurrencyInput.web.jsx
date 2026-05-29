export default function AppCurrencyInput({ form, setForm }) {
	const formattedValue = form.value
		? form.value.toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		})
		: "";

	const handleCurrencyChange = (value) => {
		const formatted = (value ?? "").replace(/\D/g, "");
		const numberValue = formatted ? parseFloat(formatted) / 100 : 0;
		setForm({ ...form, value: numberValue });
	};

	return (
		<div style={{ marginBottom: 12 }}>
			<label style={{ fontSize: 16, color: "#1F1F1F", marginBottom: 4, display: "block" }}>
				Valor
			</label>
			<input
				type="text"
				value={formattedValue}
				onChange={(e) => handleCurrencyChange(e.target.value)}
				placeholder="Digite o valor"
				inputMode="numeric"
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
