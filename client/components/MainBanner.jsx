import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window'); // Get device screen width

export default function MainBanner() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/mainbanner.jpeg")}
        style={styles.bannerImage}
        resizeMode="cover" // or "contain" depending on your design
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  bannerImage: {
    width: width,
    height: 240, // adjust as needed
    borderRadius: 10,
  },
});