import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { Clock } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  View
} from "react-native";
import RenderHTML from "react-native-render-html";

const { width } = Dimensions.get("window");

const GET_TALE = gql`
  query Tale($id: Int!) {
    tale(id: $id) {
      id
      title
      slug
      author
      content
      views_count
      read_time_minutes
      media {
        title
        alt
        path
      }
    }
  }
`;

// Mock data for related tales
const relatedTales = [
  {
    id: "2",
    title: "The Brave Little Dragon",
    author: "Michael Smith",
    rating: 4.7,
    readingTime: "10 mins",
    imageUrl:
      "https://images.unsplash.com/photo-1612506001235-f0d0892aa11b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGRvbGx8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "3",
    title: "Princess and the Moonbeam",
    author: "Sophia Williams",
    rating: 4.9,
    readingTime: "15 mins",
    imageUrl:
      "https://images.unsplash.com/photo-1598618589929-b1433d05cfc6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TGlicmFyeSUyMHJlc2VhcmNofGVufDB8fDB8fHww",
  },
  {
    id: "4",
    title: "The Secret of Whispering Woods",
    author: "David Brown",
    rating: 4.6,
    readingTime: "8 mins",
    imageUrl:
      "https://images.unsplash.com/photo-1598618589821-f031d29a366f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aWJyYXJ5JTIwcXVpZXQlMjBzdHVkeSUyMHNwYWNlfGVufDB8fDB8fHww",
  },
];

export default function TaleDetailScreen({ id }) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  //const [progress, setProgress] = useState(taleData.progress);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleContinueReading = () => {
    // In a real app, this would navigate to the reader with the saved progress
    alert(`Continuing from ${progress}%`);
  };

  const { loading, error, data } = useQuery(GET_TALE, {
    variables: { id },
    skip: !id, // safety
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const taleData = data?.tale[0] ? data?.tale[0] : null;
  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-amber-400 pt-4 pb-4 px-4 shadow-md">
        <Text className="text-2xl font-bold text-gray-800 mt-4">
          {taleData.title}
        </Text>

        <View className="flex-row items-center mt-2">
          {/* <View className="flex-row items-center mr-4">
            <Star size={16} color="#FFC107" fill="#FFC107" />
            <Text className="ml-1 text-gray-700 font-medium">
              {taleData.rating}
            </Text>
            <Text className="text-gray-500 ml-1">
              ({taleData.totalRatings})
            </Text>
          </View> */}
          {taleData.read_time_minutes ? (
            <View className="flex-row items-center">
              <Clock size={16} color="#666" />
              <Text className="ml-1 text-gray-700">
                {taleData.read_time_minutes} min
              </Text>
            </View>
          ) : (
            ""
          )}
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {/* Story Image */}
        <View className="rounded-xl overflow-hidden mb-6 shadow-md">
          {taleData.media != null && taleData.media ? (
            <Image
              source={{ uri: taleData.media.path }}
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
        {/* Author Info */}
        {taleData.author ? (
          <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
            <View className="flex-row items-center">
              {/* <Image
              source={{ uri: taleData.authorAvatar }}
              className="w-12 h-12 rounded-full"
            /> */}

              <View className="ml-3">
                <Text className="font-semibold text-gray-800">
                  By {taleData.author}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {taleData.publishDate}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          ""
        )}

        {/* Reading Progress */}
        {/* <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-semibold text-gray-800">
              Reading Progress
            </Text>
            <Text className="text-amber-500 font-medium">{progress}%</Text>
          </View>

          <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <View
              className="h-full bg-amber-400 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>

          <TouchableOpacity
            onPress={handleContinueReading}
            className="mt-4 bg-amber-400 py-3 rounded-lg items-center"
          >
            <Text className="font-bold text-gray-800">
              {progress > 0 ? "Continue Reading" : "Start Reading"}
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* Story Content Preview */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <RenderHTML
            contentWidth={width - 32}
            source={{ html: taleData.content }}
            tagsStyles={{
              p: { fontSize: 12, marginBottom: 8 },
              h1: {
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
              },
              h2: {
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 8,
              },
              // add more tags styles if needed
            }}
          />

          {/* <TouchableOpacity className="mt-3">
            <Text className="text-amber-500 font-medium">Read Full Story</Text>
          </TouchableOpacity> */}
        </View>

        {/* Related Tales */}
        {/* <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Related Tales
          </Text>

          <View className="gap-4">
            {relatedTales.map((tale) => (
              <TouchableOpacity
                key={tale.id}
                className="bg-white rounded-xl p-4 flex-row shadow-sm"
                onPress={() => router.push(`/tale-detail`)}
              >
                <Image
                  source={{ uri: tale.imageUrl }}
                  className="w-16 h-16 rounded-lg"
                />

                <View className="flex-1 ml-4">
                  <Text className="font-semibold text-gray-800">
                    {tale.title}
                  </Text>
                  <Text className="text-gray-600 text-sm mt-1">
                    by {tale.author}
                  </Text>

                  <View className="flex-row items-center mt-2">
                    <View className="flex-row items-center">
                      <Star size={14} color="#FFC107" fill="#FFC107" />
                      <Text className="ml-1 text-gray-700 text-sm">
                        {tale.rating}
                      </Text>
                    </View>

                    <View className="flex-row items-center ml-3">
                      <Clock size={14} color="#666" />
                      <Text className="ml-1 text-gray-700 text-sm">
                        {tale.readingTime}
                      </Text>
                    </View>
                  </View>
                </View>

                <ChevronRight size={20} color="#999" className="self-center" />
              </TouchableOpacity>
            ))}
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
}
