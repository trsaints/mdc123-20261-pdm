export default function AppButton({ children, onPress, disabled }) {
	return (
		<button
			onClick={onPress}
			disabled={disabled}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: 44,
				borderRadius: 8,
				backgroundColor: "#0078D4",
				color: "#FFFFFF",
				fontSize: 18,
				fontWeight: 600,
				border: "none",
				cursor: disabled ? "not-allowed" : "pointer",
				opacity: disabled ? 0.6 : 1,
			}}
		>
			{children}
		</button>
	);
}
