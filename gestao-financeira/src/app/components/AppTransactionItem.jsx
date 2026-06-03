import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { categories } from "../../constants/categories";
import { globalStyles } from "../../styles/globalStyles";
import CategoryItem from "./AppCategoryItem";
import { formatCurrency } from "../../constants/currency";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { MoneyContext } from "../../../contexts/GlobalState";

export default function AppTransactionItem({ category, date, description, value, id }) {
	const { removeTransaction } = useContext(MoneyContext);

	const categoryName = typeof category === "object" ? category?.name : category;
	const valueStyle =
		categoryName === categories.income.name
			? globalStyles.positiveText
			: globalStyles.negativeText;

	const handleDelete = () => {
		Alert.alert("Excluir transação", `Deseja excluir "${description}"?`, [
			{ text: "Cancelar", style: "cancel" },
			{
				text: "Excluir",
				style: "destructive",
				onPress: async () => {
					try {
						await removeTransaction(id);
					} catch (e) {
						Alert.alert("Erro ao excluir", e.message ?? "Tente novamente.");
					}
				},
			},
		]);
	};

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
						<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
							<Text style={valueStyle}>{formatCurrency(value)}</Text>
							<TouchableOpacity onPress={handleDelete} hitSlop={8}>
								<MaterialIcons name="delete-outline" size={20} color="#B00020" />
							</TouchableOpacity>
						</View>
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