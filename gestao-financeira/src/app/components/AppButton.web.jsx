import { colors } from "../../constants/colors";

export default function AppButton({ children, onPress, disabled }) {
	return (
		<button
			onClick={onPress}
			disabled={disabled}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: 48,
				borderRadius: 12,
				backgroundColor: disabled ? colors.inactive : colors.primary,
				color: colors.primaryContrast,
				fontSize: 16,
				fontWeight: 700,
				border: "none",
				cursor: disabled ? "not-allowed" : "pointer",
				opacity: disabled ? 0.7 : 1,
				transition: "background-color 0.2s ease, opacity 0.2s ease",
			}}
		>
			{children}
		</button>
	);
}
