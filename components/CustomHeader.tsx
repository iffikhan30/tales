import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, User } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
export default function CustomHeader() {
  const router = useRouter();
  const { id, name, table_name } = useLocalSearchParams();
  let toolbarname = name;
  if (table_name === "category") {
    toolbarname = "Category";
  } else if (table_name === "detail") {
    toolbarname = "Detail";
  }
  return (
    <View className="bg-blue-500 pt-16 pb-4 px-4">
      <View className="flex-row items-center">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white/20 p-2 rounded-full mr-3"
        >
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        {/* Title */}
        <Text className="text-white text-2xl font-bold flex-1">
          {toolbarname}
        </Text>
        {/* Profile */}
        <TouchableOpacity
          className="bg-white/20 p-2 rounded-full"
          onPress={() => router.push("/profile")}
        >
          <User color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
