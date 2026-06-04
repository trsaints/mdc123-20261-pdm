import { categories } from "../../constants/categories";
import { colors } from "../../constants/colors";

const options = Object.values(categories).map((category) => ({
	key: category.name,
	text: category.displayName,
}));

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

export default function AppCategoryPicker({ form, setForm }) {
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
				{options.map((option) => (
					<option key={option.key} value={option.key}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	);
}
