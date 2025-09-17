import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { dummyproducts } from "../../components/ProductCard"; // adjust path if needed
import ProductDetails from "../../components/ProductDetails";
import Footer from "../../components/Footer";

const ProductPage = () => {
  const { id } = useLocalSearchParams();

  // Find the product with the matching _id
  const product = dummyproducts.find((item) => item._id === id);

 if (!product) {
    return <Text className="text-3xl font-bold items-center justify-center">Product not found.</Text>
 }

  return (
 <View>
    <ProductDetails />
    <View className="mt-10"/>
    <Footer />
 </View>
  );
};

export default ProductPage;