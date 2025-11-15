import { ApolloProvider } from "@apollo/client/react";
import { client } from "../utlis/apollo";

import "react-native-reanimated";

import CategoriesScreen from "@/graphql/CategoriesScreen";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ApolloProvider client={client}>
      <CategoriesScreen />
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider> */}
    </ApolloProvider>
  );
}
