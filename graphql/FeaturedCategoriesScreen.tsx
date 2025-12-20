import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Link, useRouter } from "expo-router";
import { BookOpen } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const GET_CATEGORIES = gql`
  query {
    talesCategories {
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

export default function FeaturedCategoriesScreen() {
  const router = useRouter();
  const handleCategoryPress = (categoryId: string) => {
    router.push({
      pathname: "/talesbycategory/[id]",
      params: {
        id: categoryId,
        name: "Category Tales",
        table_name: "category",
      },
    });
  };

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <>
      {/* Featured Categories Section */}
      <View className="mb-8 py-6 px-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-800">
            Featured Categories
          </Text>
          <TouchableOpacity>
            <Link
              href={"/(tabs)/explore"}
              className="text-blue-500 font-medium"
            >
              See All
            </Link>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap gap-4">
          {data?.talesCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              className="basis-[42%] bg-white rounded-xl p-4 shadow-sm"
              onPress={() => handleCategoryPress(category.id)}
            >
              <View className="w-12 h-12 rounded-full mb-3 items-center justify-center bg-blue-100">
                <View className="w-8 h-8 rounded-full items-center justify-center bg-blue-400">
                  <BookOpen color="#fff" size={16} />
                </View>
              </View>
              <Text className="font-bold text-gray-800 mb-1">
                {category.title}
              </Text>
              <Text className="text-gray-500 text-sm">
                {category.tales_count} tale{category.tales_count > 1 ? 's':''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
}
