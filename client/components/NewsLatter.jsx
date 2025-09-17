import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const NewsletterSection = () => {
  return (
    <View className="w-full px-5 py-10 bg-gray-100 rounded-3xl mt-10 shadow-md">
      <View className="items-center">
        <Text className="text-3xl font-extrabold text-green-800">Stay Inspired</Text>
        <Text className="text-center text-base text-gray-600 mt-2 max-w-[300px]">
          Join our newsletter and be the first to discover new updates, exclusive offers, and inspiration.
        </Text>
      </View>

      <View className="flex-col space-y-3 mt-6">
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          className="bg-white px-4 py-3 border border-gray-300 rounded-lg text-gray-900"
        />

        <TouchableOpacity className="bg-green-700 flex-row items-center justify-center px-5 py-3 rounded-lg active:opacity-80">
          <Text className="text-white font-semibold mr-2">Subscribe</Text>
          <Feather name="arrow-right" size={18} color="white" />
        </TouchableOpacity>
      </View>

      <Text className="text-gray-400 text-xs text-center mt-4">
        By subscribing, you agree to our Privacy Policy and consent to receive updates.
      </Text>
    </View>
  );
};

export default NewsletterSection;