import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../constants/colors";
import GlobalState from "../../contexts/GlobalState";

const globalFontCss = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
html, body {
	font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
*, *::before, *::after {
	font-family: inherit;
}
`;

export default function RootLayout() {
	return (
		<GlobalState>
			<StatusBar backgroundColor={colors.primary} style="light" />
			<style>{globalFontCss}</style>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
			</Stack>
		</GlobalState>
	);
}
