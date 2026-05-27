import {
  View,
  ScrollView,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
} from "react-native";
import { useRef, useState } from "react";
import { globalStyles } from "../../styles/globalStyles";
import DescriptionInput from "../components/DescriptionInput";
import CurrencyInput from "../components/CurrencyInput";
import DatePicker from "../components/DatePicker";
import CategoryPicker from "../components/CategoryPicker";
import Button from "../components/Button";

const initialForm = {
  description: "",
  value: 0,
  date: new Date(),
  category: "Renda",
};

export default function AddTransactions() {
  const [form, setForm] = useState(initialForm);
  const valueInputRef = useRef();

  const addTransaction = () => {
    Alert.alert(
      "Dados Prontos!",
      `${form.description} | ${form.value} | ${form.date.toLocaleDateString()} | ${form.category}`,
    );
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.screenContainer}
      behavior="padding"
    >
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
  form: {
    gap: 12,
    marginBottom: 40,
    marginTop: 10,
  },
});
