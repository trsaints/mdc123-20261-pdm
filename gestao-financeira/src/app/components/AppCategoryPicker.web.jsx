import { categories } from "../../constants/categories";
import { colors } from "../../constants/colors";

const options = Object.values(categories).map((category) => ({
	key: category.name,
	text: category.displayName,
}));

export default function AppCategoryPicker({ form, setForm }) {
	return (
		<div style={{ marginBottom: 16 }}>
			<label style={{ fontSize: 15, color: colors.primaryText, marginBottom: 8, display: "block" }}>
				Categoria
			</label>
			<select
				value={form.category}
				onChange={(e) => setForm({ ...form, category: e.target.value })}
				style={{
					height: 48,
					paddingLeft: 16,
					borderColor: colors.secondaryText,
					borderWidth: 1,
					borderRadius: 12,
					borderStyle: "solid",
					width: "100%",
					boxSizing: "border-box",
					fontSize: 16,
					backgroundColor: "#FFFFFF",
					color: colors.primaryText,
					cursor: "pointer",
				}}
			>
				{options.map((option) => (
					<option key={option.key} value={option.key}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	);
}
