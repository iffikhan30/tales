import TaleDetailScreen from "@/graphql/TaleDetailScreen";
import { useLocalSearchParams } from "expo-router";

export default function TaleByCategoryScreen() {
  
  const { id } = useLocalSearchParams();
  const taleId = Number(id);
  return (
    <>
      <TaleDetailScreen id={taleId}/>
    </>
  );
}
