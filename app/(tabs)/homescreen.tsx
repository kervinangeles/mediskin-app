import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useState } from 'react';

const sampleImages = [
  require('../../assets/images/mediskinlogo.png'), // Replace with actual image path
  require('../../assets/images/mediskinlogo.png'), // Replace with actual image path
];

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Your Personal MediSkin App</Text>

      {/* Carousel Section */}
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {sampleImages.map((image, index) => (
          <TouchableOpacity key={index} style={styles.carouselItem} onPress={() => setActiveIndex(index)}>
            <Image source={image} style={styles.carouselImage} />
            {index === 0 && (
              <Text style={styles.carouselText}>
                Upload photos and track it at the history screen
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Carousel Dots */}
      <View style={styles.dotsContainer}>
        {sampleImages.map((_, index) => (
          <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
        ))}
      </View>

      {/* About Section */}
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>About App</Text>
        <View style={styles.aboutBox}>
          <Text style={styles.aboutText}>
            Our App Helps You Detect and Analyze Skin Conditions Instantly!
          </Text>
        </View>
        <Text style={styles.aboutDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </Text>
        <TouchableOpacity style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F0F8', paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0056B3', marginVertical: 20, textAlign: 'center' },

  // Carousel Section
  carousel: { flexDirection: 'row', marginBottom: 20 },
  carouselItem: {
    width: 200,
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  carouselImage: { width: 50, height: 50, tintColor: '#0056B3' },
  carouselText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#333333',
    paddingHorizontal: 10,
  },

  // Dots for carousel
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  dot: { width: 10, height: 10, backgroundColor: '#CCCCCC', borderRadius: 5, marginHorizontal: 5 },
  activeDot: { backgroundColor: '#0056B3' },

  // About Section
  aboutContainer: { backgroundColor: '#B3D4F5', padding: 20, borderRadius: 10 },
  aboutTitle: { fontSize: 18, fontWeight: 'bold', color: '#0056B3', marginBottom: 10, textAlign: 'center' },
  aboutBox: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  aboutText: { fontSize: 14, color: '#333333', textAlign: 'center', paddingHorizontal: 10 },
  aboutDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  readMoreButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  readMoreText: { color: '#0056B3', fontWeight: 'bold' },
});
