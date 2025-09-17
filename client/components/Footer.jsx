import { View, Text, TouchableOpacity, Linking } from "react-native";


const Footer = () => {
  return (
    <View className="w-full px-6 pt-8 bg-white text-gray-500">
      {/* Top Section */}
      <View className="flex flex-col md:flex-row gap-10 border-b border-gray-300 pb-6">
        {/* Logo + Brand Description */}
        <View className="md:max-w-[380px]">
          {/* Replace this with <Image /> or logo as needed */}
         <Text className="text-xl font-bold tracking-tight">
  <Text className="text-[#43B36A]">Casper</Text>
  <Text className="text-[#FFD447]">Market</Text>
</Text>

          <Text className="mt-4 text-sm text-gray-600">
            CasperMarket is your local grocery companion — delivering farm-fresh produce,
            affordable essentials, and unbeatable convenience right to your door. We bring quality
            and community together in every delivery.
          </Text>
        </View>

        {/* Navigation Links */}
        <View className="flex-1 flex-row justify-between">
          {/* Company Links */}
          <View>
            <Text className="font-semibold text-gray-800 mb-4">Company</Text>
            <View className="space-y-2">
              {["Home", "About us", "Contact us", "Privacy policy"].map((item, index) => (
                <TouchableOpacity key={index}>
                  <Text className="text-sm text-gray-600">{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Contact Info */}
          <View>
            <Text className="font-semibold text-gray-800 mb-4">Get in touch</Text>
            <View className="space-y-2">
              <Text className="text-sm text-gray-600">+7 (700) 784 2613</Text>
              <TouchableOpacity onPress={() => Linking.openURL("mailto:support@caspermarket.kz")}>
                <Text className="text-sm text-gray-600">support@caspermarket.kz</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Footer Bottom */}
    <Text className="text-center text-xs text-gray-400 mt-4 mb-5">
  ©️ 2025 <Text className="font-semibold text-gray-700">CasperMarket</Text>
  <Text className="text-gray-400">. All Rights Reserved.</Text>
</Text>
    </View>
  );
};

export default Footer;