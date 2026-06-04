import { useEffect, useMemo, useState } from "react";
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { api } from "../../services/api";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../styles/globalStyles";
import SummaryCharts from "../components/SummaryCharts";
import formatCurrency from "../../constants/currency";

export default function Summary() {
	const [summary, setSummary] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let active = true;

		(async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await api.getSummary();
				if (active) setSummary(data);
			} catch (e) {
				if (active) setError(e.message ?? "Não foi possível carregar o resumo.");
			} finally {
				if (active) setLoading(false);
			}
		})();

		return () => {
			active = false;
		};
	}, []);

	const highestCategory = useMemo(() => {
		if (!summary?.categories?.length) return 1;
		return Math.max(...summary.categories.map((item) => item.total));
	}, [summary]);

	const highestMonth = useMemo(() => {
		if (!summary?.monthly?.length) return 1;
		return Math.max(...summary.monthly.map((item) => Math.max(item.totalIncome, item.totalExpenses)));
	}, [summary]);

	return (
		<View style={globalStyles.screenContainer}>
			<ScrollView style={globalStyles.content} contentContainerStyle={styles.scrollContent}>
				{loading ? (
					<View style={styles.center}>
						<ActivityIndicator size="large" color={colors.primary} />
					</View>
				) : error ? (
					<Text style={[globalStyles.secondaryText, styles.error]}>{error}</Text>
				) : (
					<>
						<Text style={styles.title}>Resumo Financeiro</Text>
						<View style={styles.cardsColumn}>
							<View style={[styles.card, styles.cardIncome]}>
								<Text style={styles.cardLabel}>Receitas</Text>
								<Text style={[styles.cardValue, styles.positive]}>{formatCurrency(summary.totalIncome)}</Text>
							</View>
							<View style={[styles.card, styles.cardExpenses]}>
								<Text style={styles.cardLabel}>Despesas</Text>
								<Text style={[styles.cardValue, styles.negative]}>{formatCurrency(summary.totalExpenses)}</Text>
							</View>
							<View style={[styles.card, styles.cardBalance]}>
								<Text style={styles.cardLabel}>Saldo</Text>
								<Text style={summary.balance >= 0 ? styles.positive : styles.negative}>{formatCurrency(summary.balance)}</Text>
							</View>
						</View>

						<SummaryCharts
							categories={summary.categories}
							monthly={summary.monthly}
							highestCategory={highestCategory}
							highestMonth={highestMonth}
						/>
					</>
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	scrollContent: { paddingBottom: 28 },
	center: { flex: 1, justifyContent: "center", alignItems: "center", minHeight: 220 },
	title: { fontSize: 20, fontWeight: "700", color: colors.primaryText, marginBottom: 16 },
	cardsColumn: { gap: 12, marginBottom: 20 },
	card: {
		borderRadius: 16,
		padding: 16,
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 14,
		elevation: 4,
	},
	cardIncome: { borderLeftWidth: 4, borderLeftColor: colors.positiveText },
	cardExpenses: { borderLeftWidth: 4, borderLeftColor: colors.negativesText },
	cardBalance: { borderLeftWidth: 4, borderLeftColor: colors.primary },
	cardLabel: { color: colors.secondaryText, marginBottom: 8 },
	cardValue: { fontSize: 18, fontWeight: "700" },
	positive: { color: colors.positiveText },
	negative: { color: colors.negativesText },
	error: { paddingVertical: 20 },
});
