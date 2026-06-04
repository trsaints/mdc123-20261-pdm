import { MaterialIcons } from "@expo/vector-icons";
import AppCategoryItem from "./AppCategoryItem";
import { colors } from "../../constants/colors";

const styles = {
	row: {
		display: "flex",
		alignItems: "center",
		gap: 12,
		padding: "12px 0",
	},
	infoButton: {
		flex: 1,
		textAlign: "left",
		background: "none",
		border: "none",
		padding: 0,
		cursor: "pointer",
		color: colors.primaryText,
	},
	title: {
		fontSize: 16,
		fontWeight: 600,
		marginBottom: 4,
	},
	subtitle: {
		color: colors.secondaryText,
		fontSize: 14,
	},
	deleteButton: {
		border: "none",
		background: "rgba(255, 0, 0, 0.05)",
		borderRadius: 12,
		padding: 8,
		cursor: "pointer",
	},
};

export default function CategoryListItem({ category, onEdit, onDelete }) {
	return (
		<div style={styles.row}>
			<AppCategoryItem category={category} />
			<button type="button" style={styles.infoButton} onClick={onEdit}>
				<div style={styles.title}>{category.displayName}</div>
				<div style={styles.subtitle}>
					{category.isDefault ? "padrão" : "personalizada"}
					{category.isIncome ? " · receita" : ""}
				</div>
			</button>
			{!category.isDefault && (
				<button type="button" style={styles.deleteButton} onClick={onDelete} title="Excluir categoria">
					<MaterialIcons name="delete-outline" size={24} color={colors.negativeText} />
				</button>
			)}
		</div>
	);
}
