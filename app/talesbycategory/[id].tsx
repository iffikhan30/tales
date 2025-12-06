import TalesByCategoryScreen from "@/graphql/TalesByCategoryScreen";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
export default function TaleByCategoryScreen() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <View>
        <Text>Category ID: {id}</Text>
      </View>
      <TalesByCategoryScreen/>
    </>
  );
}
