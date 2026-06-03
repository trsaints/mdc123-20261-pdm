// contexts/GlobalState.jsx (essência)
import { createContext, useCallback, useEffect, useState } from "react";
import { api } from "../src/services/api";

export const MoneyContext = createContext();

export default function GlobalState({ children }) {
	const [transactions, setTransactions] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const refresh = useCallback(async () => {
		setLoading(true); setError(null);
		try {
			const [cats, txs] = await Promise.all([
				api.listCategories(),
				api.listTransactions(),
			]);
			setCategories(cats);
			setTransactions(txs);
		} catch (e) {
			setError(e.message ?? "Falha ao carregar dados do servidor");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => { refresh(); }, [refresh]);

	const addTransaction = useCallback(async (data) => {
		const newTransaction = await api.createTransaction(data);
		setTransactions([...transactions, newTransaction]);
		return newTransaction;
	}, [transactions]);

	const removeTransaction = useCallback(async (id) => {
		await api.deleteTransaction(id);
		setTransactions(transactions.filter((t) => t.id !== id));
	}, [transactions]);

	const addCategory = useCallback(async (data) => {
		const newCategory = await api.createCategory(data);
		setCategories([...categories, newCategory]);
		return newCategory;
	}, [categories]);

	const removeCategory = useCallback(async (id) => {
		await api.deleteCategory(id);
		setCategories(categories.filter((c) => c.id !== id));
	}, [categories]);

	return (
		<MoneyContext.Provider value={{
			transactions, setTransactions, categories, loading, error, refresh,
			addTransaction, removeTransaction, addCategory, removeCategory,
		}}>
			{children}
		</MoneyContext.Provider>
	);
}