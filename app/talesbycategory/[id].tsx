import TalesByCategoryScreen from "@/graphql/TalesByCategoryScreen";
import { useLocalSearchParams } from "expo-router";
export default function TaleByCategoryScreen() {
  const { id } = useLocalSearchParams();
  const catId = Number(id);
  return (
    <>
      <TalesByCategoryScreen catId={catId}/>
    </>
  );
}
