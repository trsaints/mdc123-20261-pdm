import { Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/globalStyles";

export default function AppButton({ children, onPress, disabled, style }) {
	return (
		<TouchableOpacity
			style={[globalStyles.button, style, disabled && globalStyles.buttonDisabled]}
			onPress={onPress}
			activeOpacity={0.8}
			disabled={disabled}
		>
			<Text style={globalStyles.buttonText}>{children}</Text>
		</TouchableOpacity>
	);
}
