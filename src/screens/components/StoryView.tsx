import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types'; // Ensure this path is correct
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import colors from '../../constants/colors';

type StoryViewProps = NativeStackScreenProps<RootStackParamList, 'StoryView'>;

interface Story {
  id: string;
  title: string;
  imageURL: string;
  timestamp: string; // Assuming this is an ISO string or a timestamp
}

const StoryView: React.FC<StoryViewProps> = ({ route }) => {
  const { storyId } = route.params; // Accessing the storyId from route params
  const [stories, setStories] = useState<Story[]>([]); // Assuming you have a way to fetch or pass stories
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(null); // Updated to handle null
  const [progress] = useState(new Animated.Value(0));

  // Mock function to fetch stories
  const fetchStories = async () => {
   
    const fetchedStories: Story[] = [
      { id: '1', imageURL: 'https://s3-alpha-sig.figma.com/img/acf8/f745/4d31209c7f43663bfe0a73d581056c59?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ddzg9up~H~sguWl7h5zPHeshga2rv2OreShAftjLYn4imivhVQieabXKe7SdzP1nzkgEFrwW06mGB6Y-OWcNHii4O7Urr-yvOoVVUWa9fZZferTkiPyjo4wAlfZ-3eZyMo0Yl-j7XSBA4BblLy1pA2fLgY-TdxnFnYGrag42pPAFj0pgrrzfnw8y4nN9TP~eLPhrdo6OB1AkXaj-4E4bSQMk-DAmTBJlIgzJYsofKuAbyQKYtlf4qG69vlYQG1GMecFipA1Zj6j2b2jUwdOUDT48XxFcHHIngVc9r2EPHPyp~ulNRTLWXherP~exMSfj590De6Qd1IM9Zsf0PXjCCA__', title: '40% sales',timestamp: new Date().toISOString()  },
      { id: '2', imageURL: 'https://s3-alpha-sig.figma.com/img/4443/ddbb/44c2426ed2f3b2b4d88234cb3e41f8b6?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SfBejTPHqGeQWN7cHWX-vpw3jIwkDEdrpZ3XfMMscwnDhqSppKTjA3PD7MvjPeYs0QrWyrBVMLcU8YXw5CuTk5wGWKv3j834-yOk-ne9l64TiXBWQXNucrwHltrzLM3Gh-t0Y4y-yh0ViGk2h24OFtew5TcEG27XnSz4CDKdMyXH3oB6xQ~QSS56BPLR~aO51JfULss9NvJsMxML5WRjTeoYruODV-UbHUGIv18FGA9yP5OsT4rNgPnHyCb2Qp6lxpHOaxC5n5eKWp6iNU9EFxDvEoOfu1oZahrchAh8Bbd-c3rSvnggm0cfJ2jlY-p9YJ60F3brqrVD7p03qltGwQ__', title: 'New Arrival',timestamp: new Date().toISOString()  },
      { id: '3', imageURL: 'https://s3-alpha-sig.figma.com/img/b194/6c5e/977258328bf0fa2e9ede1098916e0afe?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Vz08~x-qEyapJ4NM4d0VZrgoKybG1Cyc4ab0UHEP40Dann0N~F51qQp2n84JlG7EaYlhb2VyXmBcWl5izVcuRAch11ni-i1bxBDfjF9Y-OnkVfmeWToh6FCezRUijN2-zh1BqUo0G7mJmuJGMotCsP65BS4oVT3IdkwbgMQrTKx2ZglSr2KMgweraEDxJSZAvDqcnb3AsiXsYRiWM67tvw6AfcqX-nyZMw2frH4jcQOToJmjoJv-psiw65sm~jdmVoaTAdTfU9--Gy0IcFY9X2E9uAY688ixq5AMsQcbnzaqtROCN6yJAV2YfsJeHl0ZHaScKpijVuCrhTtvgtXnuQ__', title: '33% sales',timestamp: new Date().toISOString()  },
      { id: '4', imageURL: 'https://s3-alpha-sig.figma.com/img/aa5b/7bcd/8d4805fa0c1fd354b16bb41c2cf82f7d?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CJ8puvHuWgY0a6r-eLJxO0wJ8YkUehLbnwZJ0x3sI3kg4mEC46LVBo3fXVtn8yL-4ScymirQhsYKyd0kUKmYkjGBrT4tWkn6RBtvyeAG6uXMt8GRzw5YPog4N47qPxeoxbnXdkxj4QBq3ycx7ZBqZOdLqvUMmEQ0kOBNVEkedEBm0p2pjb~aF9Q~G2W9lKmc0ogGq~TCzU36vs7EzxyntONCCVh1~71Yt4YX-OG4HAeCHydL8lPXbbf1oft3CLshC7~vPycRLuRylTULv9O2w4nVpZAeHrCcPfr6xY-pW1mI7ED1bHITZe2tHjnpwTDWUqEXeZNs-CRaty8K4UEQkQ__', title: 'Fall sale',timestamp: new Date().toISOString()  },


    ];
    setStories(fetchedStories);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    if (Array.isArray(stories) && storyId) {
      const index = stories.findIndex(story => story.id === storyId);
      console.log('Story ID:', storyId);
      console.log('Stories:', stories);
      console.log('Found Index:', index);
      setCurrentStoryIndex(index === -1 ? null : index); // Handle index not found
    }
  }, [stories, storyId]);

  useEffect(() => {
    if (currentStoryIndex !== null && currentStoryIndex !== -1) {
      const animation = Animated.timing(progress, {
        toValue: 1,
        duration: 5000, // 5 seconds per story
        useNativeDriver: false,
      });

      animation.start(() => {
        if (currentStoryIndex < (stories.length - 1)) {
          setCurrentStoryIndex(currentStoryIndex + 1);
          progress.setValue(0);
        }
      });

      return () => {
        animation.stop(); // Stop the animation if the component unmounts
      };
    }
  }, [currentStoryIndex]);

  const handleGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.translationX < -50) {
      // Swipe left to go to the next story
      setCurrentStoryIndex(prevIndex => Math.min((prevIndex ?? 0) + 1, stories.length - 1));
    } else if (event.nativeEvent.translationX > 50) {
      // Swipe right to go to the previous story
      setCurrentStoryIndex(prevIndex => Math.max((prevIndex ?? 0) - 1, 0));
    }
  };

  const handlePress = () => {
    // Handle the "View offer" button press action here
  };

  if (currentStoryIndex === null || currentStoryIndex === -1 || !stories[currentStoryIndex]) {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png',
          }}
          style={styles.storyImage}
          onError={error => console.error('Error loading image:', error)}
        />
      </View>
    );
  }

  const currentStory = stories[currentStoryIndex];
  const formattedTimestamp = new Date(currentStory.timestamp).toLocaleString(); // Formatting timestamp to local string

  return (
    <PanGestureHandler onGestureEvent={handleGestureEvent}>
      <View style={styles.container}>
        <Image
          source={{ uri: currentStory.imageURL }}
          style={styles.storyImage}
          resizeMode="cover"
          onError={error => console.error('Error loading image:', error)}
        />
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: '#fff',
            },
          ]}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{currentStory.title}</Text>
          <Text style={styles.timestamp}>
            {formattedTimestamp || 'No timestamp available'}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>View offer</Text>
        </TouchableOpacity>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  progressBar: {
    height: 2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  textContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  timestamp: {
    color: colors.white,
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default StoryView;

