import { useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";
import { MoneyContext } from "../../../contexts/GlobalState";
import { globalStyles } from "../../styles/globalStyles";
import { categories as defaultCategories } from "../../constants/categories";
import { colors } from "../../constants/colors";

export default function AppCategoryPicker({ form, setForm }) {
	const { categories = [] } = useContext(MoneyContext);
	const options = categories.length
		? [...categories].sort((a, b) => a.displayName.localeCompare(b.displayName))
		: Object.values(defaultCategories);

	return (
		<View>
			<Text style={globalStyles.inputLabel}>Categoria</Text>
			<View style={styles.picker}>
				<Picker
					selectedValue={form.category}
					onValueChange={(itemValue) =>
						setForm({ ...form, category: itemValue })
					}
				>
					{options.map((category) => (
						<Picker.Item
							key={category.id ?? category.name}
							label={category.displayName}
							value={category.name}
						/>
					))}
				</Picker>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	picker: {
		height: 48,
		borderColor: colors.secondaryText,
		borderWidth: 1,
		borderRadius: 12,
		backgroundColor: "#FFFFFF",
		justifyContent: "center",
		overflow: "hidden",
	},
});
