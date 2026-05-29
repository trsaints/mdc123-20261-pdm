import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const globalStyles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		backgroundColor: colors.background,
	},
	content: {
		gap: 16,
		paddingVertical: 20,
		paddingHorizontal: 20,
	},
	card: {
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		padding: 16,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowRadius: 12,
		elevation: 3,
	},
	button: {
		backgroundColor: colors.primary,
		height: 48,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 10,
		elevation: 2,
	},
	buttonDisabled: {
		backgroundColor: colors.inactive,
	},
	buttonText: {
		color: colors.primaryContrast,
		fontSize: 16,
		fontWeight: "700",
	},
	input: {
		height: 48,
		paddingHorizontal: 16,
		borderColor: colors.secondaryText,
		borderWidth: 1,
		borderRadius: 12,
		backgroundColor: "#FFFFFF",
		color: colors.primaryText,
	},
	inputLabel: {
		fontSize: 15,
		color: colors.primaryText,
		marginBottom: 8,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.primaryText,
		marginBottom: 8,
	},
	line: {
		backgroundColor: colors.secondaryText,
		height: 1,
		opacity: 0.3,
		marginBottom: 4,
	},
	primaryText: {
		fontSize: 16,
		color: colors.primaryText,
	},
	secondaryText: {
		fontSize: 14,
		color: colors.secondaryText,
	},
	positiveText: {
		fontSize: 16,
		color: colors.positiveText,
	},
	negativeText: {
		fontSize: 16,
		color: colors.negativesText,
	},
});
