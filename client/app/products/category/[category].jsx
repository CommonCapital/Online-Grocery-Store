import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import ProductCard from '../../../components/ProductCard';
import Footer from '../../../components/Footer';


const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useLocalSearchParams();
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
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category?.toLowerCase()
  );

  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase() ===
      searchCategory?.category.toLowerCase()
  );
// ...existing code...
return (
  <ScrollView className="mt-16">
    {searchCategory && (
      <View className="flex flex-col w-max">
        <Text className="text-2xl font-medium">
          {searchCategory.text.toUpperCase()}
        </Text>
        <View className="w-16 h-0.5 bg-primary rounded-full" />
      </View>
    )}
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  <ScrollView className="flex flex-col">
    {filteredProducts
      .filter((product) => product.inStock)
      .reduce((rows, product, index, array) => {
        if (index % 2 === 0) {
          rows.push(array.slice(index, index + 2));
        }
        return rows;
      }, [])
      .map((pair, rowIndex) => (
        <View key={rowIndex} className="flex-row w-full mb-4">
          {pair.map((product, colIndex) => (
            <ProductCard key={product._id || colIndex} product={product} />
          ))}
        </View>
      ))}
    {filteredProducts.filter((product) => product.inStock).length === 0 && (
      <View className="flex items-center justify-center h-[60vh]">
        <Text className="text-3xl text-primary font-bold">
          No products found in this category.
        </Text>
      </View>
    )}
  </ScrollView>
</ScrollView>
<View className="mt-10"/>
    <Footer />
  </ScrollView>
);
// ...existing code...
};

export default ProductCategory;