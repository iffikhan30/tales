import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Clock, Star } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const GET_TALES = gql`
  query {
    tale(limit:4) {
      id
      title
      slug
      author
      views_count
      read_time_minutes
    }
  }
`;

const taleImages = [
  "https://images.unsplash.com/photo-1605627079912-97c3810a11a4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fEtpZHMlMjBwbGF5aW5nfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsYXNzcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1675351085230-ab39b2289ff4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1660142107232-e26dd2036dd8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
];

export default function RecentTalesScreen() {
  const router = useRouter();
  const handleTalePress = (taleId: string) => {
    // Navigate to category details screen
    router.push({
      pathname: "/tale/[id]",
      params: {
        id: taleId,
        name: "Tale",
        table_name: "detail",
      },
    });
  };

  const { loading, error, data } = useQuery(GET_TALES);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <>
      {/* Featured Categories Section */}
      <View className=" py-6 px-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-800">Recent Tales</Text>
          <TouchableOpacity>
            <Text className="text-blue-500 font-medium">See All</Text>
          </TouchableOpacity>
        </View>

        <View className="gap-4">
          {data?.tale.map((post) => (
            <TouchableOpacity
            key={post.id}
            className="bg-white rounded-xl p-4 flex-row shadow-sm"
            onPress={() => handleTalePress(post.id)}
          >
            <View className="mr-4">
              <Image
                source={{ uri: taleImages[post.imageIndex] }}
                style={{ width: 80, height: 80, borderRadius: 12 }}
              />
            </View>
            
            <View className="flex-1 justify-between">
              <Text className="font-bold text-gray-800 text-lg mb-1" numberOfLines={1}>
                {post.title}
              </Text>
              
              <View className="flex-row items-center mb-2">
                {post.rating ? <><Star color="#FFC107" fill="#FFC107" size={16} />
                <Text className="text-gray-600 ml-1 mr-3">{post.rating}</Text></> : ''}
                
                { post.read_time_minutes ? <><Clock color="#9CA3AF" size={16} /><Text className="text-gray-600 ml-1">{post.read_time_minutes} min</Text></> : ''}
              </View>
              
              {post.author ? <Text className="text-gray-500 text-sm">by {post.author}</Text> : ''}
            </View>
          </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
}
