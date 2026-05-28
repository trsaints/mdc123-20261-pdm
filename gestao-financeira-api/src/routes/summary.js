// src/routes/summary.js
import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const transactions = await prisma.transaction.findMany({
			include: { category: true },
		});

		const totalIncome = transactions
			.filter((tx) => tx.category.isIncome)
			.reduce((sum, tx) => sum + Number(tx.value), 0);

		const totalExpenses = transactions
			.filter((tx) => !tx.category.isIncome)
			.reduce((sum, tx) => sum + Number(tx.value), 0);

		const balance = totalIncome - totalExpenses;

		const categoriesMap = new Map();
		for (const tx of transactions) {
			const { category, value } = tx;
			const amount = Number(value);
			const existing = categoriesMap.get(category.id);
			if (existing) {
				existing.total += amount;
			} else {
				categoriesMap.set(category.id, {
					id: category.id,
					name: category.name,
					displayName: category.displayName,
					icon: category.icon,
					background: category.background,
					isIncome: category.isIncome,
					total: amount,
				});
			}
		}

		const categories = Array.from(categoriesMap.values()).sort(
			(a, b) => b.total - a.total
		);

		const monthlyMap = transactions.reduce((map, tx) => {
			const month = new Date(tx.date).toISOString().slice(0, 7);
			const current = map.get(month) ?? {
				month,
				totalIncome: 0,
				totalExpenses: 0,
			};
			const amount = Number(tx.value);
			if (tx.category.isIncome) {
				current.totalIncome += amount;
			} else {
				current.totalExpenses += amount;
			}
			map.set(month, current);
			return map;
		}, new Map());

		const monthly = Array.from(monthlyMap.values())
			.sort((a, b) => b.month.localeCompare(a.month))
			.map((item) => ({
				...item,
				balance: item.totalIncome - item.totalExpenses,
			}));

		res.json({
			totalIncome,
			totalExpenses,
			balance,
			categories,
			monthly,
			transactionCount: transactions.length,
		});
	} catch (e) {
		next(e);
	}
});

export default router;
