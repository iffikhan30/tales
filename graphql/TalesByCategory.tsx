import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Clock,
    Star,
    User
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Mock data for category details
const categoryData = {
  id: '1',
  name: 'Fairy Tales',
  description: 'Embark on magical journeys with enchanting fairy tales that spark imagination and teach valuable lessons. These timeless stories feature brave heroes, clever heroines, and mystical creatures that have captivated children for generations.',
  taleCount: 24,
  imageUrl: 'https://images.unsplash.com/photo-1515073838964-4d4d56a58b21?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U3R1ZGVudCUyMGxlYXJuZXIlMjBwdXBpbCUyMGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D'
};

// Mock data for tales in this category
const mockTales = [
  { id: '1', title: 'The Brave Little Rabbit', author: 'Emma Thompson', duration: '5 min', rating: 4.8, imageIndex: 0 },
  { id: '2', title: 'Dragon\'s Treasure Hunt', author: 'Michael Chen', duration: '7 min', rating: 4.9, imageIndex: 1 },
  { id: '3', title: 'Princess and the Moon', author: 'Sophia Williams', duration: '6 min', rating: 4.7, imageIndex: 2 },
  { id: '4', title: 'Magic Paintbrush', author: 'James Wilson', duration: '8 min', rating: 4.6, imageIndex: 3 },
  { id: '5', title: 'The Enchanted Garden', author: 'Olivia Parker', duration: '6 min', rating: 4.9, imageIndex: 4 },
  { id: '6', title: 'Talking Animals Friends', author: 'Robert Kim', duration: '5 min', rating: 4.5, imageIndex: 5 },
];

// Using images from the fetched images
const taleImages = [
  "https://images.unsplash.com/photo-1605627079912-97c3810a11a4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fEtpZHMlMjBwbGF5aW5nfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsYXNzcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1675351085230-ab39b2289ff4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1660142107232-e26dd2036dd8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1635099404457-91c3d0dade3b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8MyUyMGdyYXBoaWNzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1629216509258-4dbd7880e605?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
];

// Sorting options
const sortOptions = [
  { id: 'newest', label: 'Newest' },
  { id: 'popular', label: 'Popular' },
  { id: 'alphabetical', label: 'A-Z' }
];

export default function CategoryDetailScreen() {
  const router = useRouter();
  const [sortOption, setSortOption] = useState('newest');
  
  const handleTalePress = (taleId: string) => {
    // Navigate to tale details screen
    router.push(`/tale/${taleId}`);
  };

  // Sort tales based on selected option
  const sortedTales = [...mockTales].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return parseInt(b.id) - parseInt(a.id);
      case 'popular':
        return b.rating - a.rating;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-500 pt-12 pb-6 px-4">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="bg-white/20 p-2 rounded-full mr-3"
          >
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1">{categoryData.name}</Text>
          <TouchableOpacity className="bg-white/20 p-2 rounded-full">
            <User color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </View>
        
        {/* Category Image */}
        <View className="rounded-xl overflow-hidden mb-4">
          <Image
            source={{ uri: categoryData.imageUrl }}
            style={{ width: width - 32, height: 180 }}
            resizeMode="cover"
          />
        </View>
        
        {/* Category Description */}
        <Text className="text-white text-base mb-3">
          {categoryData.description}
        </Text>
        
        <View className="bg-white/20 rounded-full px-4 py-2 self-start">
          <Text className="text-white font-medium">{categoryData.taleCount} tales</Text>
        </View>
      </View>

      <View className="flex-1">
        {/* Sorting Options */}
        <View className="px-4 py-3 bg-white border-b border-gray-200">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                className={`px-4 py-2 rounded-full mr-2 ${
                  sortOption === option.id 
                    ? 'bg-amber-400' 
                    : 'bg-gray-100'
                }`}
                onPress={() => setSortOption(option.id)}
              >
                <Text 
                  className={`font-medium ${
                    sortOption === option.id 
                      ? 'text-gray-800' 
                      : 'text-gray-600'
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

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
                    <View className="flex-row items-center">
                      <Star color="#FFC107" fill="#FFC107" size={14} />
                      <Text className="text-gray-600 ml-1 text-sm">
                        {tale.rating}
                      </Text>
                    </View>
                    
                    <View className="flex-row items-center">
                      <Clock color="#9CA3AF" size={14} />
                      <Text className="text-gray-600 ml-1 text-sm">
                        {tale.duration}
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
  );
}