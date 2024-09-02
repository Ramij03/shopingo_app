import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { Slide } from '../store/slides';
import colors from '../../constants/colors';

const { width, height } = Dimensions.get('window');

const OnBoardItem: React.FC<{ item: Slide }> = ({ item }) => {
  return (
    <ImageBackground source={item.image} style={styles.imageBackground}>
      <View style={styles.overlay}>
        <Text style={styles.labelText}>{item.note}</Text>
      </View>

      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width,
    height: height * 0.65,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlay: {
    top: height * 0.25,
    right:width * 0.25,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: width * 0.02,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: width * 0.04,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.1,
    backgroundColor: colors.white,
    borderTopLeftRadius: width * 0.1,
    borderTopRightRadius: width * 0.1,
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.06,
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * 0.01,
  },
  description: {
    fontSize: width * 0.04,
    color: colors.grey,
    textAlign: 'center',
    marginTop: height * 0.02,
  },
});

export default OnBoardItem;
