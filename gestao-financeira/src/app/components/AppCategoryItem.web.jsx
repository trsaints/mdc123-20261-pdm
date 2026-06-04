import { categories } from "../../constants/categories";
import { colors } from "../../constants/colors";

const iconEmojis = {
	income: "💼",
	food: "🍔",
	house: "🏠",
	education: "📚",
	travel: "✈️",
};

export default function AppCategoryItem({ category }) {
	const key = typeof category === "object" ? category?.name : category;
	const categoryConfig = categories[key] ?? categories.food;
	const emoji = iconEmojis[categoryConfig.name] || "📦";

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
			{emoji}
		</div>
	);
}
