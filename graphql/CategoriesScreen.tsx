import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

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

export default function CategoriesScreen() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
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
    />
  );
}
