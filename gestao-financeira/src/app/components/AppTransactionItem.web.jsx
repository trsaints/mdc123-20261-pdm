import { categories } from "../../constants/categories";
import AppCategoryItem from "./AppCategoryItem";
import { colors } from "../../constants/colors";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { MoneyContext } from "../../../contexts/GlobalState";

const actionButton = {
	border: "none",
	background: "rgba(0, 0, 0, 0.04)",
	borderRadius: 10,
	cursor: "pointer",
	fontSize: 16,
	padding: 8,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

export default function AppTransactionItem({ category, date, description, value, id }) {
	const router = useRouter();
	const { removeTransaction } = useContext(MoneyContext);
	const key = typeof category === "object" ? category?.name : category;
	const valueStyle = key === categories.income.name ? colors.positiveText : colors.negativesText;
	const dateValue = new Date(date).toLocaleDateString("pt-BR");

	const handleDelete = async () => {
		if (window.confirm(`Deseja excluir "${description}"?`)) {
			try {
				await removeTransaction(id);
			} catch (e) {
				window.alert(e.message ?? "Erro ao excluir");
			}
		}
	};

	const handleEdit = () => {
		router.push({ pathname: "/add-transactions", params: { id } });
	};

	return (
		<div
			style={{
				marginBottom: 16,
				padding: 18,
				borderRadius: 16,
				backgroundColor: colors.surface,
				border: `1px solid ${colors.border}`,
				boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 14,
				}}
			>
				<AppCategoryItem category={category} />
				<div style={{ flex: 1 }}>
					<div style={{ color: colors.secondaryText, fontSize: 13, marginBottom: 6 }}>
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
						<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
							<button style={actionButton} onClick={handleEdit} title="Editar transação">
								✏️
							</button>
							<div style={{ color: valueStyle, fontWeight: 700 }}>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value ?? 0))}</div>
							<button style={actionButton} onClick={handleDelete} title="Excluir transação">
								🗑️
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
