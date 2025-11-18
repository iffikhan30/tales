import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { BookOpen } from 'lucide-react-native';
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const GET_CATEGORIES = gql`
  query {
    talesCategories {
      id
      title
      slug
      content
    }
  }
`;

export default function FeaturedCategoriesScreen() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <>
    {/* Featured Categories Section */}
    <ThemedView className="mb-8">
      <ThemedView className="flex-row justify-between items-center mb-4">
        <ThemedText className="text-xl font-bold text-gray-800">Featured Categories</ThemedText>
        <TouchableOpacity>
          <ThemedText className="text-blue-500 font-medium">See All</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      
      <ThemedView className="flex-row flex-wrap gap-4">
        {data?.talesCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            className="basis-[42%] bg-white rounded-xl p-4 shadow-sm"
            onPress={() => handleCategoryPress(category.id)}
          >
            <ThemedView 
              className="w-12 h-12 rounded-full mb-3 items-center justify-center"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <ThemedView 
                className="w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: category.color }}
              >
                <BookOpen color="#FFFFFF" size={16} />
              </ThemedView>
            </ThemedView>
            <Text className="font-bold text-gray-800 mb-1">{category.name}</Text>
            <Text className="text-gray-500 text-sm">{category.taleCount} tales</Text>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ThemedView>
    {/* <FlatList
      data={data?.talesCategories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={{
            padding: 12,
            margin: 10,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {item.title}
          </Text>

          <Text style={{ color: "gray" }}>{item.slug}</Text>

          <Text>{item.content.replace(/<[^>]+>/g, "")}</Text>
        </View>
      )}
    /> */}
    </>
  );
}
