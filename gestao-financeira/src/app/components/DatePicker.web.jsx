import { Text, View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";

export default function DatePicker({ form, setForm }) {
	const date = form.date instanceof Date ? form.date : new Date(form.date);
	const value = date.toISOString().slice(0, 10);

	return (
		<View>
			<Text style={globalStyles.inputLabel}>Data</Text>
			<input
				type="date"
				value={value}
				onChange={(event) =>
					setForm({ ...form, date: new Date(event.target.value) })
				}
				style={globalStyles.input}
			/>
		</View>
	);
}
