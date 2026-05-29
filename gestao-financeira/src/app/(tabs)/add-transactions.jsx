import { useContext, useRef, useState } from "react";
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import { MoneyContext } from "../../../contexts/GlobalState";
import { api } from "../../services/api";
import { globalStyles } from "../../styles/globalStyles";
import Button from "../components/AppButton";
import CategoryPicker from "../components/AppCategoryPicker";
import CurrencyInput from "../components/AppCurrencyInput";
import DatePicker from "../components/AppDatePicker";
import DescriptionInput from "../components/AppDescriptionInput";

const initialForm = {
	description: "",
	value: 0,
	date: new Date(),
	category: "Renda",
};

export default function AddTransactions() {
	const [form, setForm] = useState(initialForm);
	const [submitting, setSubmitting] = useState(false);
	const valueInputRef = useRef();

	// Consumindo o estado global!
	const { transactions, setTransactions, categories } = useContext(MoneyContext);

	const addTransaction = async () => {
		if (!form.description.trim()) {
			Alert.alert("Erro", "Informe uma descrição");
			return;
		}
		if (form.value <= 0) {
			Alert.alert("Erro", "Informe um valor maior que zero");
			return;
		}

		// Find the category ID by name
		const categoryObj = categories.find((c) => c.name === form.category);
		if (!categoryObj) {
			Alert.alert("Erro", "Categoria inválida");
			return;
		}

		setSubmitting(true);
		try {
			// Call API to create transaction
			const newTransaction = await api.createTransaction({
				description: form.description.trim(),
				value: form.value,
				date: form.date.toISOString(),
				categoryId: categoryObj.id,
			});

			// Update local state with the created transaction
			setTransactions([...transactions, newTransaction]);
			setForm(initialForm); // Limpa o formulário
			Alert.alert("Sucesso!", "Transação adicionada com sucesso!");
		} catch (e) {
			Alert.alert("Erro ao salvar", e.message ?? "Tente novamente.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<KeyboardAvoidingView style={globalStyles.screenContainer}>
			<Pressable onPress={Keyboard.dismiss}>
				<ScrollView style={globalStyles.content}>
					<View style={styles.form}>
						<DescriptionInput
							form={form}
							setForm={setForm}
							valueInputRef={valueInputRef}
						/>
						<CurrencyInput
							form={form}
							setForm={setForm}
							valueInputRef={valueInputRef}
						/>
						<DatePicker form={form} setForm={setForm} />
						<CategoryPicker form={form} setForm={setForm} />
					</View>
					<Button onPress={addTransaction} disabled={submitting}>
						{submitting ? "Salvando..." : "Adicionar"}
					</Button>
				</ScrollView>
			</Pressable>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	form: { gap: 12, marginBottom: 40, marginTop: 10 },
});
