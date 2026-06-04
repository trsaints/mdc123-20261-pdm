import { useContext } from "react";
import { MoneyContext } from "../../../contexts/GlobalState";
import { categories as defaultCategories } from "../../constants/categories";
import { colors } from "../../constants/colors";

export default function AppCategoryPicker({ form, setForm }) {
	const { categories = [] } = useContext(MoneyContext);
	const options = categories.length
		? [...categories].sort((a, b) => a.displayName.localeCompare(b.displayName))
		: Object.values(defaultCategories);

	const fieldStyle = {
		height: 48,
		width: "100%",
		padding: "0 16px",
		borderRadius: 12,
		border: `1px solid ${colors.border}`,
		backgroundColor: colors.surface,
		color: colors.primaryText,
		fontSize: 16,
		boxSizing: "border-box",
		outline: "none",
	};

	return (
		<div style={{ marginBottom: 16 }}>
			<label style={{ fontSize: 14, color: colors.primaryText, marginBottom: 8, display: "block" }}>
				Categoria
			</label>
			<select
				value={form.category}
				onChange={(e) => setForm({ ...form, category: e.target.value })}
				style={fieldStyle}
			>
				{options.map((category) => (
					<option key={category.id ?? category.name} value={category.name}>
						{category.displayName}
					</option>
				))}
			</select>
		</div>
	);
}
