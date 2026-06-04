import { View, Text, StyleSheet } from "react-native";
import { Svg, Path, Circle } from "react-native-svg";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../styles/globalStyles";
import formatCurrency from "../../constants/currency";

function createSlicePath(cx, cy, r, startAngle, endAngle) {
	const x1 = cx + r * Math.cos(startAngle);
	const y1 = cy + r * Math.sin(startAngle);
	const x2 = cx + r * Math.cos(endAngle);
	const y2 = cy + r * Math.sin(endAngle);
	const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

	return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
}

export default function SummaryPieChart({ categories }) {
	const total = categories.reduce((sum, item) => sum + Number(item.total ?? 0), 0);

	if (!categories.length || total === 0) {
		return (
			<View style={[styles.section, styles.emptySection]}>
				<Text style={styles.sectionTitle}>Distribuição por categoria</Text>
				<Text style={styles.emptyText}>Nenhuma categoria com valores para exibir o gráfico.</Text>
			</View>
		);
	}

	let cursor = -Math.PI / 2;
	const slices = categories.map((item) => {
		const value = Number(item.total ?? 0);
		const portion = value / total;
		const sweep = portion * 2 * Math.PI;
		const path = createSlicePath(110, 110, 100, cursor, cursor + sweep);
		const slice = {
			id: item.id,
			label: item.displayName,
			value,
			percentage: portion * 100,
			color: item.background || colors.primary,
			path,
		};
		cursor += sweep;
		return slice;
	});

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Distribuição por categoria</Text>
			<View style={styles.chartRow}>
				<View style={styles.chartWrapper}>
					<Svg width={220} height={220} viewBox="0 0 220 220">
						{[...slices].map((slice) => (
							<Path key={slice.id} d={slice.path} fill={slice.color} />
						))}
						<Circle cx={110} cy={110} r={60} fill={colors.surface} />
					</Svg>
					<View style={styles.centerLabel}>
						<Text style={styles.totalValue}>{formatCurrency(total)}</Text>
						<Text style={styles.centerSubtitle}>Total</Text>
					</View>
				</View>
				<View style={styles.legend}>
					{[...slices].map((slice) => (
						<View key={slice.id} style={styles.legendItem}>
							<View style={[styles.legendDot, { backgroundColor: slice.color }]} />
							<View style={styles.legendText}>
								<Text style={styles.legendLabel}>{slice.label}</Text>
								<Text style={styles.legendValue}>
									{slice.percentage.toFixed(1)}% · {formatCurrency(slice.value)}
								</Text>
							</View>
						</View>
					))}
				</View>
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
	emptySection: {
		alignItems: "center",
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.primaryText,
		marginBottom: 16,
	},
	chartRow: {
		flexDirection: "row",
		gap: 16,
		alignItems: "center",
	},
	chartWrapper: {
		width: 220,
		height: 220,
		alignItems: "center",
		justifyContent: "center",
	},
	centerLabel: {
		position: "absolute",
		alignItems: "center",
	},
	totalValue: {
		fontSize: 16,
		fontWeight: "700",
		color: colors.primaryText,
	},
	centerSubtitle: {
		fontSize: 12,
		color: colors.secondaryText,
	},
	legend: {
		flex: 1,
		gap: 10,
	},
	legendItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	legendDot: {
		width: 14,
		height: 14,
		borderRadius: 7,
	},
	legendText: {
		flex: 1,
	},
	legendLabel: {
		fontSize: 14,
		fontWeight: "700",
		color: colors.primaryText,
	},
	legendValue: {
		fontSize: 12,
		color: colors.secondaryText,
	},
	emptyText: {
		color: colors.secondaryText,
		textAlign: "center",
	},
});
