import { useContext, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { MoneyContext } from "../../../contexts/GlobalState";
import Button from "../components/AppButton";
import CategoryListItem from "../components/CategoryListItem";
import { globalStyles } from "../../styles/globalStyles";
import { colors } from "../../constants/colors";

const PRESET_COLORS = [
	"#DE9AC3",
	"#DEA17B",
	"#E6E088",
	"#AB8FBE",
	"#82C9DE",
	"#FFB6B6",
	"#9ED9A9",
	"#F5C26B",
];

/**
 * Tela "Categorias".
 *
 * Permite listar, criar e excluir categorias. Categorias com `isDefault=true`
 * vêm do seed do back-end e não podem ser removidas — o servidor barra a
 * exclusão e a tela apenas oculta o botão de remover para essas linhas.
 *
 * @returns {JSX.Element}
 */
export default function CategoriesScreen() {
	const { categories, loading, addCategory, removeCategory, updateCategory } =
		useContext(MoneyContext);

	const [name, setName] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [icon, setIcon] = useState("label");
	const [background, setBackground] = useState(PRESET_COLORS[0]);
	const [submitting, setSubmitting] = useState(false);

	const [editingId, setEditingId] = useState(null);

	const isWeb = Platform.OS === "web";
	const showAlert = (title, message) => {
		if (isWeb) {
			window.alert(message ? `${title}\n\n${message}` : title);
			return;
		}
		Alert.alert(title, message);
	};

	const confirmAction = async (title, message) => {
		if (isWeb) {
			return window.confirm(`${title}\n\n${message}`);
		}
		return new Promise((resolve) => {
			Alert.alert(
				title,
				message,
				[
					{ text: "Cancelar", style: "cancel", onPress: () => resolve(false) },
					{ text: "Excluir", style: "destructive", onPress: () => resolve(true) },
				],
				{ cancelable: true }
			);
		});
	};

	const resetForm = () => {
		setName("");
		setDisplayName("");
		setIcon("label");
		setBackground(PRESET_COLORS[0]);
		setEditingId(null);
	};

	const handleCreate = async () => {
		if (!name.trim() || name.trim().length < 2) {
			showAlert("Erro", "Informe um identificador (mín. 2 letras, sem espaços). ");
			return;
		}
		if (!displayName.trim() || displayName.trim().length < 2) {
			showAlert("Erro", "Informe o nome de exibição (mín. 2 letras). ");
			return;
		}
		if (!icon.trim()) {
			showAlert("Erro", "Informe o nome do ícone (Material Icons). ");
			return;
		}

		setSubmitting(true);
		try {
			if (editingId) {
				await updateCategory(editingId, {
					name: name.trim().toLowerCase().replace(/\s+/g, "_"),
					displayName: displayName.trim(),
					icon: icon.trim(),
					background,
					isIncome: false,
				});
				showAlert("Categoria atualizada!");
			} else {
				await addCategory({
					name: name.trim().toLowerCase().replace(/\s+/g, "_"),
					displayName: displayName.trim(),
					icon: icon.trim(),
					background,
					isIncome: false,
				});
				showAlert("Categoria criada!");
			}
			resetForm();
		} catch (e) {
			showAlert("Erro ao salvar", e.message ?? "Tente novamente.");
		} finally {
			setSubmitting(false);
		}
	};

	const handleDelete = async (item) => {
		const confirmed = await confirmAction(
			"Excluir categoria",
			`Deseja excluir "${item.displayName}"?`
		);
		if (!confirmed) return;

		try {
			await removeCategory(item.id);
		} catch (e) {
			showAlert("Erro ao excluir", e.message ?? "Tente novamente.");
		}
	};

	if (loading && categories.length === 0) {
		return (
			<View style={[globalStyles.screenContainer, styles.center]}>
				<ActivityIndicator size="large" color={colors.primary} />
			</View>
		);
	}

	return (
		<View style={globalStyles.screenContainer}>
			<FlatList
				data={categories}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.listContent}
				ListHeaderComponent={
					<View style={styles.formContainer}>
						<Text style={globalStyles.sectionTitle}>
							{editingId ? "Editar categoria" : "Nova categoria"}
						</Text>
						{editingId ? (
							<Text style={globalStyles.secondaryText}>
								Modo de edição ativo — atualize os dados da categoria e salve.
							</Text>
						) : null}

						<View>
							<Text style={globalStyles.inputLabel}>Identificador</Text>
							<TextInput
								value={name}
								onChangeText={setName}
								placeholder="ex.: health"
								autoCapitalize="none"
								style={globalStyles.input}
							/>
						</View>

						<View>
							<Text style={globalStyles.inputLabel}>Nome de exibição</Text>
							<TextInput
								value={displayName}
								onChangeText={setDisplayName}
								placeholder="ex.: Saúde"
								style={globalStyles.input}
							/>
						</View>

						<View>
							<Text style={globalStyles.inputLabel}>Ícone (Material)</Text>
							<TextInput
								value={icon}
								onChangeText={setIcon}
								placeholder="ex.: favorite, fastfood, work"
								autoCapitalize="none"
								style={globalStyles.input}
							/>
						</View>

						<View>
							<Text style={globalStyles.inputLabel}>Cor</Text>
							<View style={styles.colorRow}>
								{PRESET_COLORS.map((c) => (
									<TouchableOpacity
										key={c}
										onPress={() => setBackground(c)}
										style={[
											styles.colorDot,
											{ backgroundColor: c },
											background === c && styles.colorDotSelected,
										]}
									/>
								))}
							</View>
						</View>

						<Button onPress={handleCreate} disabled={submitting}>
							{submitting ? "Salvando..." : editingId ? "Salvar alterações" : "Adicionar categoria"}
						</Button>
						{editingId ? (
							<Button onPress={resetForm} disabled={submitting} style={styles.cancelButton}>
								Cancelar edição
							</Button>
						) : null}

						<View style={[globalStyles.line, { marginTop: 16 }]} />
						<Text style={globalStyles.sectionTitle}>Categorias cadastradas</Text>
					</View>
				}
				renderItem={({ item }) => (
										<CategoryListItem
						category={item}
						onEdit={() => {
							setEditingId(item.id);
							setName(item.name);
							setDisplayName(item.displayName);
							setIcon(item.icon || "label");
							setBackground(item.background || PRESET_COLORS[0]);
						}}
						onDelete={() => handleDelete(item)}
					/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	listContent: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		gap: 12,
	},
	formContainer: {
		gap: 12,
		marginBottom: 8,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "700",
		color: colors.primaryText,
		marginTop: 4,
	},
	cancelButton: {
		backgroundColor: colors.surface,
		borderColor: colors.border,
		borderWidth: 1,
		marginTop: 8,
	},
	categoryRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingVertical: 6,
	},
	categoryInfo: {
		flex: 1,
	},
	colorRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	colorDot: {
		width: 32,
		height: 32,
		borderRadius: 16,
		borderWidth: 2,
		borderColor: "transparent",
	},
	colorDotSelected: {
		borderColor: colors.primaryText,
	},
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});