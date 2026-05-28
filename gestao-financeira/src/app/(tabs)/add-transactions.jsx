import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { globalStyles } from "../../styles/globalStyles";
import Button from "../components/Button";
import CategoryPicker from "../components/CategoryPicker";
import CurrencyInput from "../components/CurrencyInput";
import DatePicker from "../components/DatePicker";
import DescriptionInput from "../components/DescriptionInput";

const initialForm = {
	description: "",
	value: 0,
	date: new Date(),
	category: "Renda",
};

export default function AddTransactions() {
	const [form, setForm] = useState(initialForm);
	const valueInputRef = useRef();

	// Consumindo o estado global!
	const [transactions, setTransactions] = useContext(MoneyContext);

	const setAsyncStorage = async (data) => {
		try {
			// O AsyncStorage exige que salvemos objetos/arrays como String
			await AsyncStorage.setItem("transactions", JSON.stringify(data));
		} catch (e) {
			console.log(e);
		}
	};

	const addTransaction = async () => {
		// Cria a transação gerando um ID baseado no tamanho da lista
		const newTransaction = { id: transactions.length + 1, ...form };
		const updatedTransactions = [...transactions, newTransaction];

		setTransactions(updatedTransactions); // Atualiza a memória RAM (Contexto)
		setForm(initialForm); // Limpa o formulário
		await setAsyncStorage(updatedTransactions); // Atualiza a memória do Celular (Storage)

		Alert.alert("Sucesso!", "Transação adicionada com sucesso!");
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
					<Button onPress={addTransaction}>Adicionar</Button>
				</ScrollView>
			</Pressable>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	form: { gap: 12, marginBottom: 40, marginTop: 10 },
});
