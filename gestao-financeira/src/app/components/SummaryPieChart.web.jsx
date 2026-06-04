import { colors } from "../../constants/colors";
import formatCurrency from "../../constants/currency";

const styles = {
	container: {
		marginBottom: 24,
		backgroundColor: colors.surface,
		borderRadius: 16,
		padding: 18,
		border: `1px solid ${colors.border}`,
		boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 700,
		color: colors.primaryText,
		marginBottom: 16,
	},
	chartRow: {
		display: "flex",
		gap: 16,
		alignItems: "center",
	},
	chartWrapper: {
		position: "relative",
		width: 220,
		height: 220,
		borderRadius: "50%",
		overflow: "hidden",
		boxShadow: "0 12px 32px rgba(0, 0, 0, 0.08)",
	},
	sliceCenter: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: 120,
		height: 120,
		borderRadius: "50%",
		backgroundColor: colors.surface,
		boxShadow: "0 0 0 8px rgba(255,255,255,0.92)",
	},
	totalValue: {
		fontSize: 16,
		fontWeight: 700,
		color: colors.primaryText,
	},
	centerSubtitle: {
		fontSize: 12,
		color: colors.secondaryText,
	},
	legend: {
		display: "grid",
		gap: 12,
		flex: 1,
	},
	legendItem: {
		display: "flex",
		alignItems: "center",
		gap: 12,
	},
	legendDot: {
		width: 14,
		height: 14,
		borderRadius: 7,
	},
	legendLabel: {
		fontSize: 14,
		fontWeight: 700,
		color: colors.primaryText,
	},
	legendValue: {
		fontSize: 12,
		color: colors.secondaryText,
	},
	emptyText: {
		color: colors.secondaryText,
		marginTop: 8,
	},
};

export default function SummaryPieChart({ categories }) {
	const total = categories.reduce((sum, item) => sum + Number(item.total ?? 0), 0);

	if (!categories.length || total === 0) {
		return (
			<div style={styles.container}>
				<div style={styles.sectionTitle}>Distribuição por categoria</div>
				<div style={styles.emptyText}>Nenhuma categoria com valores para exibir o gráfico.</div>
			</div>
		);
	}

	let cursor = 0;
	const gradientStops = categories.map((item) => {
		const value = Number(item.total ?? 0);
		const percentage = value / total;
		const start = cursor * 100;
		const end = (cursor + percentage) * 100;
		cursor += percentage;
		return `${item.background || colors.primary} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
	});

	return (
		<div style={styles.container}>
			<div style={styles.sectionTitle}>Distribuição por categoria</div>
			<div style={styles.chartRow}>
				<div style={{ ...styles.chartWrapper, background: `conic-gradient(${gradientStops.join(", ")})` }}>
					<div style={styles.sliceCenter}>
						<div style={styles.totalValue}>{formatCurrency(total)}</div>
						<div style={styles.centerSubtitle}>Total</div>
					</div>
				</div>
				<div style={styles.legend}>
					{categories.map((item) => {
						const percentage = total ? (Number(item.total ?? 0) / total) * 100 : 0;
						return (
							<div key={item.id} style={styles.legendItem}>
								<div style={{ ...styles.legendDot, backgroundColor: item.background || colors.primary }} />
								<div>
									<div style={styles.legendLabel}>{item.displayName}</div>
									<div style={styles.legendValue}>
										{percentage.toFixed(1)}% · {formatCurrency(item.total)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
