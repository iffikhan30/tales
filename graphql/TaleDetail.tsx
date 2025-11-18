import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Bookmark,
    BookmarkPlus,
    ChevronRight,
    Clock,
    Star
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Mock data for the tale detail
const taleData = {
  id: '1',
  title: 'The Magical Forest Adventure',
  author: 'Emma Johnson',
  authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
  rating: 4.8,
  totalRatings: 124,
  readingTime: '12 mins',
  publishDate: 'May 15, 2023',
  imageUrl: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFnaWMlMjBkcmFnb25zJTIwd2l6YXJkc3xlbnwwfHwwfHx8MA%3D%3D',
  content: `Once upon a time, in a land far away, there was a magical forest filled with extraordinary creatures. Luna, a young girl with sparkling eyes and a curious heart, lived at the edge of this enchanted woodland.

Every morning, Luna would gaze longingly at the forest's entrance, wondering what mysteries lay beyond the twisted trees and glowing mushrooms. Her grandmother had always warned her to stay away, telling tales of mischievous sprites and tricky fairies who delighted in leading travelers astray.

But one day, when a baby unicorn wandered too close to the village and became lost, Luna knew she had to act. She bravely stepped into the forest, her heart pounding with both fear and excitement.

As she ventured deeper, the trees seemed to whisper secrets, and flowers bloomed in her footsteps. Soon, she encountered a wise old owl perched on a branch. "Looking for something, little one?" the owl hooted knowingly.

"The baby unicorn," Luna replied. "It's lost, and I'm trying to help it find its way home."

The owl's amber eyes twinkled. "Ah, the Crystal Glade. Follow the path of silver butterflies, and you shall find what you seek."`,
  progress: 65, // Percentage of story read
};

// Mock data for related tales
const relatedTales = [
  {
    id: '2',
    title: 'The Brave Little Dragon',
    author: 'Michael Smith',
    rating: 4.7,
    readingTime: '10 mins',
    imageUrl: 'https://images.unsplash.com/photo-1612506001235-f0d0892aa11b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGRvbGx8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: '3',
    title: 'Princess and the Moonbeam',
    author: 'Sophia Williams',
    rating: 4.9,
    readingTime: '15 mins',
    imageUrl: 'https://images.unsplash.com/photo-1598618589929-b1433d05cfc6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TGlicmFyeSUyMHJlc2VhcmNofGVufDB8fDB8fHww'
  },
  {
    id: '4',
    title: 'The Secret of Whispering Woods',
    author: 'David Brown',
    rating: 4.6,
    readingTime: '8 mins',
    imageUrl: 'https://images.unsplash.com/photo-1598618589821-f031d29a366f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aWJyYXJ5JTIwcXVpZXQlMjBzdHVkeSUyMHNwYWNlfGVufDB8fDB8fHww'
  }
];

export default function TaleDetailScreen() {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [progress, setProgress] = useState(taleData.progress);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleContinueReading = () => {
    // In a real app, this would navigate to the reader with the saved progress
    alert(`Continuing from ${progress}%`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-amber-400 pt-12 pb-4 px-4 shadow-md">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="bg-white rounded-full p-2 shadow-sm"
          >
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={toggleBookmark} 
            className="bg-white rounded-full p-2 shadow-sm"
          >
            {isBookmarked ? (
              <Bookmark size={24} color="#FFC107" fill="#FFC107" />
            ) : (
              <BookmarkPlus size={24} color="#333" />
            )}
          </TouchableOpacity>
        </View>
        
        <Text className="text-2xl font-bold text-gray-800 mt-4">{taleData.title}</Text>
        
        <View className="flex-row items-center mt-2">
          <View className="flex-row items-center mr-4">
            <Star size={16} color="#FFC107" fill="#FFC107" />
            <Text className="ml-1 text-gray-700 font-medium">{taleData.rating}</Text>
            <Text className="text-gray-500 ml-1">({taleData.totalRatings})</Text>
          </View>
          
          <View className="flex-row items-center">
            <Clock size={16} color="#666" />
            <Text className="ml-1 text-gray-700">{taleData.readingTime}</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {/* Story Image */}
        <View className="rounded-xl overflow-hidden mb-6 shadow-md">
          <Image 
            source={{ uri: taleData.imageUrl }} 
            style={{ width: width - 32, height: 200 }}
            className="rounded-xl"
          />
        </View>

        {/* Author Info */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <View className="flex-row items-center">
            <Image 
              source={{ uri: taleData.authorAvatar }} 
              className="w-12 h-12 rounded-full"
            />
            
            <View className="ml-3">
              <Text className="font-semibold text-gray-800">By {taleData.author}</Text>
              <Text className="text-gray-500 text-sm">{taleData.publishDate}</Text>
            </View>
          </View>
        </View>

        {/* Reading Progress */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-semibold text-gray-800">Reading Progress</Text>
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
              {progress > 0 ? 'Continue Reading' : 'Start Reading'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Story Content Preview */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <Text className="text-gray-800 leading-relaxed">
            {taleData.content}
          </Text>
          
          <TouchableOpacity className="mt-3">
            <Text className="text-amber-500 font-medium">Read Full Story</Text>
          </TouchableOpacity>
        </View>

        {/* Related Tales */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Related Tales</Text>
          
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
                  <Text className="font-semibold text-gray-800">{tale.title}</Text>
                  <Text className="text-gray-600 text-sm mt-1">by {tale.author}</Text>
                  
                  <View className="flex-row items-center mt-2">
                    <View className="flex-row items-center">
                      <Star size={14} color="#FFC107" fill="#FFC107" />
                      <Text className="ml-1 text-gray-700 text-sm">{tale.rating}</Text>
                    </View>
                    
                    <View className="flex-row items-center ml-3">
                      <Clock size={14} color="#666" />
                      <Text className="ml-1 text-gray-700 text-sm">{tale.readingTime}</Text>
                    </View>
                  </View>
                </View>
                
                <ChevronRight size={20} color="#999" className="self-center" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}