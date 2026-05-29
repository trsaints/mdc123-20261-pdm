import { StyleSheet, Text, View } from "react-native";
import { categories } from "../../constants/categories";
import { globalStyles } from "../../styles/globalStyles";
import CategoryItem from "./AppCategoryItem";

export default function AppTransactionItem({
	category,
	date,
	description,
	value,
}) {
	const valueStyle =
		category === categories.income.name
			? globalStyles.positiveText
			: globalStyles.negativeText;

	return (
		<>
			<View style={styles.itemContainer}>
				<CategoryItem category={category} />
				<View style={styles.textContainer}>
					<Text style={globalStyles.secondaryText}>
						{new Date(date).toLocaleDateString("pt-BR")}
					</Text>
					<View style={styles.bottomLineContainer}>
						<Text style={globalStyles.primaryText}>{description}</Text>
						<Text style={valueStyle}>
							{value.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
						</Text>
					</View>
				</View>
			</View>
			<View style={globalStyles.line} />
		</>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		padding: 16,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOpacity: 0.06,
		shadowRadius: 10,
		elevation: 2,
	},
	textContainer: {
		flex: 1,
		marginLeft: 12,
		justifyContent: "center",
	},
	bottomLineContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 6,
	},
});