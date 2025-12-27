import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft
} from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
export default function CustomHeader() {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const { id, name, table_name } = useLocalSearchParams();
  let toolbarname = name;
  if (table_name === "category") {
    toolbarname = "Category";
  } else if (table_name === "detail") {
    toolbarname = "Detail";
  }
  return (
    <View className="bg-blue-500 pt-16 pb-4 px-4 bg-amber-400">
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
        {/* <TouchableOpacity
          className="bg-white/20 p-2 rounded-full"
          onPress={() => router.push("/profile")}
        >
          <User color="#FFFFFF" size={24} />
        </TouchableOpacity> */}
        {/* <TouchableOpacity 
            onPress={toggleBookmark} 
            className="bg-white rounded-full p-2 shadow-sm"
          >
            {isBookmarked ? (
              <Bookmark size={24} color="#FFC107" fill="#FFC107" />
            ) : (
              <BookmarkPlus size={24} color="#333" />
            )}
          </TouchableOpacity> */}
      </View>
    </View>
  );
}
