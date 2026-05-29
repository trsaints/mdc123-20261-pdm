import { categories } from "../../constants/categories";
import AppCategoryItem from "./AppCategoryItem";
import { colors } from "../../constants/colors";

export default function AppTransactionItem({ category, date, description, value }) {
	const valueStyle = category === categories.income.name ? colors.positiveText : colors.negativesText;
	const dateValue = new Date(date).toLocaleDateString("pt-BR");

	return (
		<div
			style={{
				marginBottom: 16,
				padding: 16,
				borderRadius: 16,
				backgroundColor: "#FFFFFF",
				boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
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
						<div style={{ fontSize: 15, color: colors.primaryText, fontWeight: 600 }}>{description}</div>
						<div style={{ color: valueStyle, fontWeight: 700 }}>
							{value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
