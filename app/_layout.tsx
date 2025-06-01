import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "NanumGothic-Regular": require("../assets/fonts/NanumGothic-Regular.ttf"),
    "NanumGothic-Bold": require("../assets/fonts/NanumGothic-Bold.ttf"),
    "NanumGothic-ExtraBold": require("../assets/fonts/NanumGothic-ExtraBold.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false, // 상단 헤더 숨김
        }}
      />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
