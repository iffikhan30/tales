import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { Clock, Star } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RenderHTML from "react-native-render-html";

const GET_TALES_BY_CATEGORY = gql`
  query GetTalesByCategory($id: Int!) {
    talesByCategory(category_id: $id) {
      id
      title
      slug
      author
      views_count
      read_time_minutes
    }
  }
`;

const GET_SINGLE_CATEGORY = gql`
  query GetCategory($id: Int!) {
    talesCategories(id: $id) {
      id
      title
      slug
      content
      tales_count
      media {
        title
        alt
        path
      }
    }
  }
`;

const { width } = Dimensions.get("window");

// Using images from the fetched images
const taleImages = [
  "https://images.unsplash.com/photo-1605627079912-97c3810a11a4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fEtpZHMlMjBwbGF5aW5nfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsYXNzcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1675351085230-ab39b2289ff4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1660142107232-e26dd2036dd8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1635099404457-91c3d0dade3b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8MyUyMGdyYXBoaWNzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1629216509258-4dbd7880e605?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D",
];

// Sorting options
const sortOptions = [
  { id: "newest", label: "Newest" },
  { id: "popular", label: "Popular" },
  { id: "alphabetical", label: "A-Z" },
];

export default function TalesByCategoryScreen({ catId }: { catId: string }) {
  const router = useRouter();
  const [sortOption, setSortOption] = useState("newest");
  const [expanded, setExpanded] = useState(false);

  const handleTalePress = (taleId: string) => {
    // Navigate to tale details screen
    router.push(`/tale/${taleId}`);
  };

  const {
    loading: loadingCat,
    error: errorCat,
    data: dataCat,
  } = useQuery(GET_SINGLE_CATEGORY, {
    variables: { id: catId },
    skip: Number.isNaN(catId), // safety
  });

  const { loading, error, data } = useQuery(GET_TALES_BY_CATEGORY, {
    variables: { id: catId }, // ✅ SAME NAME AS QUERY
    skip: Number.isNaN(catId),
  });

  if (loadingCat || loading) return <ActivityIndicator />;
  if (errorCat) return <Text>Error: {errorCat.message}</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  const categoryData = dataCat?.talesCategories[0];

  const mockTaless = data?.talesByCategory ?? [];
  // Sort tales based on selected option
  const sortedTales = [...mockTaless].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return parseInt(b.id) - parseInt(a.id);
      case "popular":
        return b.rating - a.rating;
      case "alphabetical":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <>
      <View className="bg-blue-500 pt-5 pb-6 px-4">
        {/* Category Image */}
        <View className="rounded-xl overflow-hidden mb-4">
          {categoryData.media != null && categoryData.media ? (
            <Image
              source={{ uri: categoryData.media.path }}
              style={{ width: width - 32, height: 180 }}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={require("@/assets/images/partial-react-logo.png")}
              style={{ width: width - 32, height: 180 }}
              resizeMode="cover"
            />
          )}
        </View>

        {/* Category Description */}
        <Text className="text-white text-base mb-3">
          <RenderHTML source={{ html: categoryData.content }}></RenderHTML>
        </Text>

        <View className="bg-white/20 rounded-full px-4 py-2 self-start">
          <Text className="text-white font-medium">
            {categoryData.tales_count} tales
          </Text>
        </View>
      </View>
      <View className="flex-1 bg-gray-50">
        <View className="flex-1">
          {/* Sorting Options */}
          {/* <View className="px-4 py-3 bg-white border-b border-gray-200">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
            >
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  className={`px-4 py-2 rounded-full mr-2 ${
                    sortOption === option.id ? "bg-amber-400" : "bg-gray-100"
                  }`}
                  onPress={() => setSortOption(option.id)}
                >
                  <Text
                    className={`font-medium ${
                      sortOption === option.id
                        ? "text-gray-800"
                        : "text-gray-600"
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View> */}

          {/* Tales Grid */}
          <ScrollView className="flex-1 px-4 py-4">
            <View className="flex-row flex-wrap gap-4">
              {sortedTales.map((tale) => (
                <TouchableOpacity
                  key={tale.id}
                  className="basis-[42%] bg-white rounded-xl overflow-hidden shadow-sm"
                  onPress={() => handleTalePress(tale.id)}
                >
                  <View className="mb-3">
                    <Image
                      source={{ uri: taleImages[tale.imageIndex] }}
                      style={{ width: (width - 56) / 2, height: 120 }}
                      resizeMode="cover"
                    />
                  </View>

                  <View className="p-3">
                    <Text
                      className="font-bold text-gray-800 mb-1"
                      numberOfLines={2}
                    >
                      {tale.title}
                    </Text>

                    <Text className="text-gray-500 text-sm mb-2">
                      by {tale.author}
                    </Text>

                    <View className="flex-row items-center justify-between">
                      {tale.rating ? (
                        <View className="flex-row items-center">
                          <Star color="#FFC107" fill="#FFC107" size={14} />
                          <Text className="text-gray-600 ml-1 text-sm">
                            {tale.rating}
                          </Text>
                        </View>
                      ) : (
                        ""
                      )}

                      <View className="flex-row items-center">
                        <Clock color="#9CA3AF" size={14} />
                        <Text className="text-gray-600 ml-1 text-sm">
                          {tale.read_time_minutes} min
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
