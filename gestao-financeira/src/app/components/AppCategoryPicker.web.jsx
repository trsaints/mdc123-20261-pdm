import { categories } from "../../constants/categories";

const options = Object.values(categories).map((category) => ({
	key: category.name,
	text: category.displayName,
}));

export default function AppCategoryPicker({ form, setForm }) {
	return (
		<div style={{ marginBottom: 12 }}>
			<label style={{ fontSize: 16, color: "#1F1F1F", marginBottom: 4, display: "block" }}>
				Categoria
			</label>
			<select
				value={form.category}
				onChange={(e) => setForm({ ...form, category: e.target.value })}
				style={{
					height: 40,
					paddingLeft: 16,
					borderColor: "#BFBFBF",
					borderWidth: 1,
					borderRadius: 8,
					borderStyle: "solid",
					width: "100%",
					boxSizing: "border-box",
					fontSize: 16,
					backgroundColor: "#FFFFFF",
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
