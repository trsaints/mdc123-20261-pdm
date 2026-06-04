import { Platform, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

const fontFamily = Platform.OS === "web"
	? "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
	: "Inter";

export const globalStyles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		backgroundColor: colors.background,
		fontFamily,
	},
	content: {
		gap: 20,
		paddingVertical: 22,
		paddingHorizontal: 20,
	},
	card: {
		backgroundColor: colors.surface,
		borderRadius: 16,
		padding: 18,
		borderWidth: 1,
		borderColor: colors.border,
		shadowColor: colors.shadow,
		shadowOpacity: 1,
		shadowRadius: 14,
		elevation: 3,
	},
	button: {
		backgroundColor: colors.primary,
		height: 48,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
		shadowColor: colors.shadow,
		shadowOpacity: 1,
		shadowRadius: 12,
		elevation: 2,
	},
	buttonDisabled: {
		backgroundColor: colors.inactive,
		opacity: 0.72,
	},
	buttonText: {
		color: colors.primaryContrast,
		fontSize: 16,
		fontWeight: "700",
		fontFamily,
	},
	input: {
		height: 48,
		paddingHorizontal: 16,
		borderColor: colors.border,
		borderWidth: 1,
		borderRadius: 12,
		backgroundColor: colors.surface,
		color: colors.primaryText,
		fontSize: 16,
		fontFamily,
	},
	inputLabel: {
		fontSize: 14,
		color: colors.primaryText,
		marginBottom: 8,
		fontFamily,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.primaryText,
		marginBottom: 12,
		fontFamily,
	},
	line: {
		backgroundColor: colors.border,
		height: 1,
		marginVertical: 10,
	},
	primaryText: {
		fontSize: 16,
		color: colors.primaryText,
		fontFamily,
	},
	secondaryText: {
		fontSize: 14,
		color: colors.secondaryText,
		fontFamily,
	},
	positiveText: {
		fontSize: 16,
		color: colors.positiveText,
		fontFamily,
	},
	negativeText: {
		fontSize: 16,
		color: colors.negativesText,
		fontFamily,
	},
});
