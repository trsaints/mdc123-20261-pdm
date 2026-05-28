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

	const addTransaction = useCallback(async (data) => { /* POST + setTransactions */ }, []);
	const removeTransaction = useCallback(async (id) => { /* DELETE + filter */ }, []);
	const addCategory = useCallback(async (data) => { /* POST + setCategories */ }, []);
	const removeCategory = useCallback(async (id) => { /* DELETE + filter */ }, []);

	return (
		<MoneyContext.Provider value={{
			transactions, setTransactions, categories, loading, error, refresh,
			addTransaction, removeTransaction, addCategory, removeCategory,
		}}>
			{children}
		</MoneyContext.Provider>
	);
}