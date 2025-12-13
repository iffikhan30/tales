import ParallaxScrollView from '@/components/parallax-scroll-view';
import FeaturedCategoriesScreen from '@/graphql/FeaturedCategoriesScreen';
import RecentTalesScreen from '@/graphql/RecentTalesScreen';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/home.jpg')}
          style={styles.reactLogo}
        />
      }>
        <FeaturedCategoriesScreen />
        <RecentTalesScreen />
        <RecentTalesScreen />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
