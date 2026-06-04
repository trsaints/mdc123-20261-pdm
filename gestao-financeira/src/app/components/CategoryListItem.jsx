import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppCategoryItem from "./AppCategoryItem";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../styles/globalStyles";

export default function CategoryListItem({ category, onEdit, onDelete }) {
	return (
		<View style={styles.row}>
			<AppCategoryItem category={category} />
			<TouchableOpacity style={styles.info} onPress={onEdit}>
				<Text style={globalStyles.primaryText}>{category.displayName}</Text>
				<Text style={globalStyles.secondaryText}>
					{category.isDefault ? "padrão" : "personalizada"}
					{category.isIncome ? " · receita" : ""}
				</Text>
			</TouchableOpacity>
			{!category.isDefault && (
				<TouchableOpacity onPress={onDelete} style={styles.deleteButton} hitSlop={8}>
					<MaterialIcons name="delete-outline" size={24} color={colors.negativeText} />
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingVertical: 6,
	},
	info: {
		flex: 1,
	},
	deleteButton: {
		padding: 8,
	},
});
