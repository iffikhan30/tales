import ParallaxScrollView from "@/components/parallax-scroll-view";
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from 'react-native';
export default function TaleByCategoryScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <View>
        <Text>Category ID: {id}</Text>
      </View>
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
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});