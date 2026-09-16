import { ApolloProvider } from "@apollo/client/react";
import { StatusBar } from 'expo-status-bar';
import ".././style/global.css";
import { client } from "../utlis/apollo";

import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";



export const unstable_settings = {
  anchor: '(tabs)',
};
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ApolloProvider client={client}>

      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ApolloProvider>
  );
}
