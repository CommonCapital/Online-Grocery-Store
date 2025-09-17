import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const { t } = useTranslation()
  const router = useRouter();
 const categories = [
  
  {
    text: t("fruits"),
    path: "fruits",
    bgColor: "#FDE68A",
    category: "Fruits",
  },
  {
    text: t("vegetables"),
    path: "vegetables",
    bgColor: "#BBF7D0",
    category: "Vegetables",
  },
  {
    text: t("bakery"),
    path: "bakery",
    bgColor: "#FECACA",
    category: "Bakery",
  },
  {
    text: t("dairy"),
    path: "dairy",
    bgColor: "#BFDBFE",
    category: "Dairy",
  },
  {
    text: t("meat"),
    path: "meat",
    bgColor: "#FECACA",
    category: "Meat",
  },
  {
    text: t("snacks"),
    path: "snacks",
    bgColor: "#FCD34D",
    category: "Snacks",
  },
  {
    text: t("drinks"),
    path: "beverages",
    bgColor: "#C7D2FE",
    category: "Beverages",
  },
  {
    text: t("fast_foods"),
    path: "fast-foods",
    bgColor: "#F87171",
    category: "Fast Foods",
  },
  {
    text: t("instant_food"),
    path: "instant-food",
    bgColor: "#FB923C",
    category: "Instant Food",
  },
  {
    text: t("grains"),
    path: "cereals",
    bgColor: "#FCD34D",
    category: "Cereals",
  },
  
];
  // ✅ Define categories inside the component body (after t is available)
  

  return (
    <View className="mt-14 px-4">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <Text className="text-2xl font-bold text-gray-900">{t("categories_header")}</Text>
        <Feather name="grid" size={22} color="#43B36A" className="ml-2" />
      </View>

      {/* Horizontal Scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={true} className="flex-row">
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            className="mr-4"
            activeOpacity={0.7}
            onPress={() => {
              
                

              router.push(`/products/category/${category.path}`);
            }}
          >
            <View
              style={{ backgroundColor: category.bgColor }}
              className="rounded-2xl px-5 py-4 shadow-sm"
            >
              <Text className="text-lg font-semibold text-gray-800">
                {category.text}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
export default Categories;