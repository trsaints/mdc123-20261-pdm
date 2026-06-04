import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { categories } from "../../constants/categories";
import { colors } from "../../constants/colors";

/**
 * Exibe o ícone da categoria em um círculo com a cor de fundo correspondente.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string|Object} props.category - Chave ou objeto da categoria.
 *   Se o valor for um objeto retornado pelo backend, usa suas propriedades diretamente.
 * @returns {JSX.Element} View com ícone Material centrado.
 */
export default function AppCategoryItem({ category }) {
	const categoryConfig =
		typeof category === "object"
			? { ...categories[category.name], ...category }
			: categories[category] ?? categories.food;

	return (
		<View
			style={[styles.background, { backgroundColor: categoryConfig.background }]}
		>
			<MaterialIcons
				name={categoryConfig.icon ?? "label"}
				size={24}
				color={colors.primaryContrast}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: 44,
		height: 44,
		borderRadius: 22,
		shadowColor: colors.shadow,
		shadowOpacity: 1,
		shadowRadius: 10,
		elevation: 2,
	},
});