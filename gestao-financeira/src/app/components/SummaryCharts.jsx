import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../styles/globalStyles";
import formatCurrency from "../../constants/currency";
import SummaryPieChart from "./SummaryPieChart";

export default function SummaryCharts({ categories, monthly, highestCategory, highestMonth }) {
	return (
		<View>
			<SummaryPieChart categories={categories} />
			<View style={styles.section}>
				<Text style={globalStyles.sectionTitle}>Por categoria</Text>
				<View style={styles.legendRow}>
					<View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
					<Text style={styles.legendLabel}>Total por categoria</Text>
				</View>
				{categories.map((item) => {
					const percentage = highestCategory ? (item.total / highestCategory) * 100 : 0;
					return (
						<View key={item.id} style={styles.categoryRow}>
							<View style={styles.categoryHeader}>
								<View style={[styles.categoryBadge, { backgroundColor: item.background }]} />
								<View style={styles.categoryTitle}>
									<Text style={styles.categoryName}>{item.displayName}</Text>
									<Text style={globalStyles.secondaryText}>
										{item.isIncome ? "Receita" : "Despesa"} · {percentage.toFixed(1)}%
									</Text>
								</View>
							</View>
							<View style={styles.categoryBarBackground}>
								<View
									style={[
										styles.categoryBar,
										{ width: `${Math.max(percentage, 6)}%`, backgroundColor: item.background },
									]}
								/>
							</View>
							<Text style={styles.categoryTotal}>{formatCurrency(item.total)}</Text>
						</View>
					);
				})}
			</View>

			<View style={styles.section}>
				<Text style={globalStyles.sectionTitle}>Histórico mensal</Text>
				<View style={styles.legendRow}>
					<View style={[styles.legendDot, { backgroundColor: colors.positiveText }]} />
					<Text style={styles.legendLabel}>Receitas</Text>
					<View style={[styles.legendDot, { backgroundColor: colors.negativesText, marginLeft: 20 }]} />
					<Text style={styles.legendLabel}>Despesas</Text>
				</View>
				{monthly.map((item) => {
					const incomeWidth = highestMonth ? (item.totalIncome / highestMonth) * 100 : 0;
					const expenseWidth = highestMonth ? (item.totalExpenses / highestMonth) * 100 : 0;
					return (
						<View key={item.month} style={styles.monthRow}>
							<View style={styles.monthHeader}>
								<Text style={styles.monthLabel}>{item.month}</Text>
								<Text style={styles.balanceText}>{formatCurrency(item.balance)}</Text>
							</View>
							<View style={styles.monthBars}>
								<View style={styles.monthBarWrapper}>
									<Text style={styles.monthValueLabel}>Receitas</Text>
									<View style={styles.monthTrack}>
										<View style={[styles.monthBar, styles.monthIncome, { width: `${Math.max(incomeWidth, 6)}%` }]} />
									</View>
								</View>
								<View style={styles.monthBarWrapper}>
									<Text style={styles.monthValueLabel}>Despesas</Text>
									<View style={styles.monthTrack}>
										<View style={[styles.monthBar, styles.monthExpense, { width: `${Math.max(expenseWidth, 6)}%` }]} />
									</View>
								</View>
							</View>
						</View>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	section: {
		marginBottom: 24,
		backgroundColor: colors.surface,
		borderRadius: 16,
		padding: 18,
		borderWidth: 1,
		borderColor: colors.border,
		shadowColor: colors.shadow,
		shadowOpacity: 1,
		shadowRadius: 14,
		elevation: 2,
	},
	legendRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	legendDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginRight: 8,
	},
	legendLabel: {
		color: colors.secondaryText,
		fontSize: 14,
		marginRight: 16,
	},
	categoryRow: {
		marginBottom: 18,
	},
	categoryHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	categoryBadge: {
		width: 14,
		height: 14,
		borderRadius: 7,
		marginRight: 12,
	},
	categoryTitle: {
		flex: 1,
	},
	categoryName: {
		fontSize: 15,
		fontWeight: "700",
		color: colors.primaryText,
	},
	categoryBarBackground: {
		backgroundColor: "#F1F2F6",
		height: 12,
		borderRadius: 999,
		overflow: "hidden",
	},
	categoryBar: {
		height: 12,
		borderRadius: 999,
	},
	categoryTotal: {
		marginTop: 8,
		color: colors.primaryText,
		fontWeight: "700",
	},
	monthRow: {
		marginBottom: 20,
	},
	monthHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	monthLabel: {
		fontSize: 14,
		fontWeight: "700",
		color: colors.primaryText,
	},
	balanceText: {
		color: colors.secondaryText,
	},
	monthBars: {
		gap: 10,
	},
	monthBarWrapper: {
		gap: 6,
	},
	monthValueLabel: {
		fontSize: 13,
		color: colors.secondaryText,
	},
	monthTrack: {
		backgroundColor: "#F1F2F6",
		height: 12,
		borderRadius: 999,
		overflow: "hidden",
	},
	monthBar: {
		height: 12,
		borderRadius: 999,
	},
	monthIncome: {
		backgroundColor: colors.positiveText,
	},
	monthExpense: {
		backgroundColor: colors.negativesText,
	},
});
