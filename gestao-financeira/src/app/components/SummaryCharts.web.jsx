import { colors } from "../../constants/colors";
import formatCurrency from "../../constants/currency";

const barStyles = {
	container: {
		marginBottom: 24,
	},
	legend: {
		display: "flex",
		alignItems: "center",
		gap: 12,
		marginBottom: 16,
	},
	legendDot: (backgroundColor) => ({
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor,
	}),
	legendLabel: {
		color: colors.secondaryText,
		fontSize: 14,
	},
	categoryRow: {
		marginBottom: 18,
	},
	categoryHeader: {
		display: "flex",
		alignItems: "center",
		gap: 12,
		marginBottom: 8,
	},
	categoryBadge: (backgroundColor) => ({
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor,
	}),
	categoryName: {
		fontSize: 15,
		fontWeight: 700,
		color: colors.primaryText,
	},
	categoryBarBackground: {
		backgroundColor: "#F1F2F6",
		height: 12,
		borderRadius: 999,
		overflow: "hidden",
	},
	categoryBar: (width, backgroundColor) => ({
		width,
		height: 12,
		borderRadius: 999,
		backgroundColor,
	}),
	categoryTotal: {
		marginTop: 8,
		color: colors.primaryText,
		fontWeight: 700,
	},
	monthRow: {
		marginBottom: 20,
	},
	monthHeader: {
		display: "flex",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	monthLabel: {
		fontSize: 14,
		fontWeight: 700,
		color: colors.primaryText,
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
	monthBar: (width, backgroundColor) => ({
		width,
		height: 12,
		borderRadius: 999,
		backgroundColor,
	}),
};

const sectionTitle = {
	fontSize: 18,
	fontWeight: 700,
	color: colors.primaryText,
	marginBottom: 16,
};

const sectionSubtitle = {
	fontSize: 14,
	color: colors.secondaryText,
	marginBottom: 16,
};

export default function SummaryCharts({ categories, monthly, highestCategory, highestMonth }) {
	return (
		<div>
			<section style={barStyles.container}>
				<h2 style={sectionTitle}>Por categoria</h2>
				<div style={barStyles.legend}>
					<div style={barStyles.legendDot(colors.primary)} />
					<div style={sectionSubtitle}>Total por categoria</div>
				</div>
				{categories.map((item) => {
					const percentage = highestCategory ? (item.total / highestCategory) * 100 : 0;
					return (
						<div key={item.id} style={barStyles.categoryRow}>
							<div style={barStyles.categoryHeader}>
								<div style={barStyles.categoryBadge(item.background)} />
								<div>
									<div style={barStyles.categoryName}>{item.displayName}</div>
									<div style={sectionSubtitle}>
										{item.isIncome ? "Receita" : "Despesa"} · {percentage.toFixed(1)}%
									</div>
								</div>
							</div>
							<div style={barStyles.categoryBarBackground}>
								<div style={barStyles.categoryBar(`${Math.max(percentage, 6)}%`, item.background)} />
							</div>
							<div style={barStyles.categoryTotal}>{formatCurrency(item.total)}</div>
						</div>
					);
				})}
			</section>

			<section style={barStyles.container}>
				<h2 style={sectionTitle}>Histórico mensal</h2>
				<div style={barStyles.legend}>
					<div style={barStyles.legendDot(colors.positiveText)} />
					<div style={sectionSubtitle}>Receitas</div>
					<div style={barStyles.legendDot(colors.negativesText)} />
					<div style={sectionSubtitle}>Despesas</div>
				</div>
				{monthly.map((item) => {
					const incomeWidth = highestMonth ? (item.totalIncome / highestMonth) * 100 : 0;
					const expenseWidth = highestMonth ? (item.totalExpenses / highestMonth) * 100 : 0;
					return (
						<div key={item.month} style={barStyles.monthRow}>
							<div style={barStyles.monthHeader}>
								<div style={barStyles.monthLabel}>{item.month}</div>
								<div style={sectionSubtitle}>{formatCurrency(item.balance)}</div>
							</div>
							<div style={barStyles.monthBars}>
								<div style={barStyles.monthBarWrapper}>
									<div style={barStyles.monthValueLabel}>Receitas</div>
									<div style={barStyles.monthTrack}>
										<div style={barStyles.monthBar(`${Math.max(incomeWidth, 6)}%`, colors.positiveText)} />
									</div>
								</div>
								<div style={barStyles.monthBarWrapper}>
									<div style={barStyles.monthValueLabel}>Despesas</div>
									<div style={barStyles.monthTrack}>
										<div style={barStyles.monthBar(`${Math.max(expenseWidth, 6)}%`, colors.negativesText)} />
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</section>
		</div>
	);
}
