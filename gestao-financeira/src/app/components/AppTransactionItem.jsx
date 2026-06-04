import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { categories } from "../../constants/categories";
import { globalStyles } from "../../styles/globalStyles";
import CategoryItem from "./AppCategoryItem";
import { formatCurrency } from "../../constants/currency";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { MoneyContext } from "../../../contexts/GlobalState";
import { useRouter } from "expo-router";
import { colors } from "../../constants/colors";

export default function AppTransactionItem({ category, date, description, value, id }) {
	const { removeTransaction } = useContext(MoneyContext);
	const router = useRouter();

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

	const handleEdit = () => {
		router.push({ pathname: "/add-transactions", params: { id } });
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
						<View style={styles.actionsRow}>
							<TouchableOpacity onPress={handleEdit} hitSlop={8} style={styles.iconButton}>
								<MaterialIcons name="edit" size={20} color={colors.primary} />
							</TouchableOpacity>
							<Text style={valueStyle}>{formatCurrency(value)}</Text>
							<TouchableOpacity onPress={handleDelete} hitSlop={8} style={styles.iconButton}>
								<MaterialIcons name="delete-outline" size={20} color={colors.negativesText} />
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
		backgroundColor: colors.surface,
		borderRadius: 16,
		padding: 18,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: colors.border,
		shadowColor: colors.shadow,
		shadowOpacity: 1,
		shadowRadius: 12,
		elevation: 3,
	},
	textContainer: {
		flex: 1,
		marginLeft: 12,
		justifyContent: "center",
	},
	bottomLineContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 6,
	},
	actionsRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	iconButton: {
		width: 36,
		height: 36,
		borderRadius: 10,
		backgroundColor: "rgba(0, 0, 0, 0.04)",
		alignItems: "center",
		justifyContent: "center",
	},
});