import { colors } from "../../constants/colors";

const buttonStyle = {
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	height: 48,
	minWidth: 120,
	borderRadius: 12,
	padding: "0 20px",
	border: "none",
	fontSize: 16,
	fontWeight: 700,
	color: colors.primaryContrast,
	backgroundColor: colors.primary,
	cursor: "pointer",
	boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
	transition: "background-color 0.2s ease, transform 0.2s ease, opacity 0.2s ease",
};

export default function AppButton({ children, onPress, disabled }) {
	return (
		<button
			onClick={onPress}
			disabled={disabled}
			style={{
				...buttonStyle,
				backgroundColor: disabled ? colors.inactive : colors.primary,
				opacity: disabled ? 0.72 : 1,
				cursor: disabled ? "not-allowed" : "pointer",
			}}
		>
			{children}
		</button>
	);
}
