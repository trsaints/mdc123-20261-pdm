import { categories } from "../../constants/categories";
import AppCategoryItem from "./AppCategoryItem";
import { colors } from "../../constants/colors";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { MoneyContext } from "../../../contexts/GlobalState";

const iconStyles = {
	button: {
		border: "none",
		background: "transparent",
		cursor: "pointer",
		fontSize: 16,
		padding: 4,
	},
};

export default function AppTransactionItem({ category, date, description, value, id }) {
	const router = useRouter();
	const { removeTransaction } = useContext(MoneyContext);
	const key = typeof category === "object" ? category?.name : category;
	const valueStyle = key === categories.income.name ? colors.positiveText : colors.negativeText;
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
						<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
							<button style={iconStyles.button} onClick={handleEdit} title="Editar transação">
								✏️
							</button>
							<div style={{ color: valueStyle, fontWeight: 700 }}>
								{new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL",
								}).format(Number(value ?? 0))}
							</div>
							<button style={iconStyles.button} onClick={handleDelete} title="Excluir transação">
								🗑️
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
