import { categories } from "../../constants/categories";
import AppCategoryItem from "./AppCategoryItem";
import { colors } from "../../constants/colors";

export default function AppTransactionItem({ category, date, description, value }) {
	const categoryConfig = categories[category] ?? categories.food;
	const valueStyle = category === categories.income.name ? colors.positiveText : colors.negativesText;
	const dateValue = new Date(date).toLocaleDateString("pt-BR");

	return (
		<div style={{ marginBottom: 16 }}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					paddingBottom: 4,
					gap: 12,
				}}
			>
				<AppCategoryItem category={category} />
				<div style={{ flex: 1 }}>
					<div style={{ color: colors.secondaryText, fontSize: 13, marginBottom: 4 }}>
						{dateValue}
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<div style={{ fontSize: 15, color: colors.primaryText }}>{description}</div>
						<div style={{ color: valueStyle, fontWeight: 700 }}>
							{value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
						</div>
					</div>
				</div>
			</div>
			<div
				style={{
					backgroundColor: colors.secondaryText,
					height: 1,
					opacity: 0.5,
					marginBottom: 4,
					marginTop: 8,
				}}
			/>
		</div>
	);
}
