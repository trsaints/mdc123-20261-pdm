import { MaterialIcons } from "@expo/vector-icons";
import { categories } from "../../constants/categories";
import { colors } from "../../constants/colors";

export default function AppCategoryItem({ category }) {
	const categoryConfig =
		typeof category === "object"
			? category
			: categories[category] ?? categories.food;

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: 44,
				height: 44,
				borderRadius: 22,
				backgroundColor: categoryConfig.background,
				boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
				fontSize: 24,
			}}
		>
			<MaterialIcons
				name={categoryConfig.icon ?? "label"}
				size={24}
				color={colors.primaryContrast}
			/>
		</div>
	);
}
