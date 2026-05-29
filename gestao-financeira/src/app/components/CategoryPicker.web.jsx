import { Text, View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { categories } from "../../constants/categories";

export default function CategoryPicker({ form, setForm }) {
	return (
		<View>
			<Text style={globalStyles.inputLabel}>Categoria</Text>
			<select
				value={form.category}
				onChange={(event) => setForm({ ...form, category: event.target.value })}
				style={{
					...globalStyles.input,
					WebkitAppearance: "none",
					MozAppearance: "none",
					appearance: "none",
					backgroundColor: "transparent",
				}}
			>
				{Object.values(categories).map((category) => (
					<option key={category.name} value={category.name}>
						{category.displayName}
					</option>
				))}
			</select>
		</View>
	);
}
