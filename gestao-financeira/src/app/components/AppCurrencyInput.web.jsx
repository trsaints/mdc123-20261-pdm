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
		<div style={{ marginBottom: 16 }}>
			<label style={{ fontSize: 14, color: colors.primaryText, marginBottom: 8, display: "block" }}>
				Valor
			</label>
			<input
				type="text"
				value={formattedValue}
				onChange={(e) => handleCurrencyChange(e.target.value)}
				placeholder="Digite o valor"
				inputMode="numeric"
				style={fieldStyle}
			/>
		</div>
	);
}
