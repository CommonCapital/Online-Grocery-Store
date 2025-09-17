import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";

;

const ProductDetails = () => {
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
  
const {products, currency, addToCart} = useAppContext();

const [relatedProducts, setRelatedProducts] = useState([]);
 const {id} = useLocalSearchParams();
const product = products.find((item) => item._id === id);
const [thumbnail, setThumbnail] = useState(product.image[0]);
useEffect(() => {
if(products.length > 0) {
    let productsCopy = products.slice();
    productsCopy = productsCopy.filter((item) => product.category === item.category)
    setRelatedProducts(productsCopy.slice(0, 5))
}
}, [products]);

useEffect(() => {
setThumbnail(product?.image[0] ? product.image[0] : null)
}, [product]);

  return product && (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Breadcrumbs */}
      <TouchableOpacity onPress={() => router.push("/")}><Text style={styles.breadcrumb}>Home</Text></TouchableOpacity>
       <TouchableOpacity onPress={() => router.push("/products")}><Text style={styles.breadcrumb}>/Products/</Text></TouchableOpacity>
      {categories.map((category, index) => {
  <TouchableOpacity key={index} onPress={() => router.push(`/products/${category.path}`) }>
      <Text  style={styles.breadcrumb}>
        / {product.category} /{" "}
         </Text>
         </TouchableOpacity>
      })}
    
        <Text style={styles.breadcrumbHighlight}>{product.name}</Text>
     
      

      {/* Product content */}
      <View style={styles.content}>
        {/* Left: Images */}
        <View style={styles.imageSection}>
          <ScrollView contentContainerStyle={styles.thumbnailList}>
            {product.image.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => setThumbnail(image)}>
                <Image source={{uri: image}} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Image source={{ uri: thumbnail}} style={styles.mainImage} />
        </View>

        {/* Right: Info */}
        <View style={styles.infoSection}>
          <Text style={styles.productName}>{product.name}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Text key={i} style={i < product.rating ? styles.star : styles.starInactive}>
                  ★
                </Text>
              ))}
            <Text style={styles.ratingText}>({product.rating})</Text>
          </View>

          {/* Prices */}
          <View style={styles.priceBox}>
            <Text style={styles.strike}>MRP: {currency}{product.price}</Text>
            <Text style={styles.offerPrice}>MRP: {currency}{product.offerPrice}</Text>
            <Text style={styles.taxNote}>(inclusive of all taxes)</Text>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>About Product</Text>
         {Array.isArray(product.description) ? (
  product.description.map((description, i) => (
    <Text key={i} style={styles.descriptionItem}>• {description}</Text>
  ))
) : (
  <Text style={styles.descriptionItem}>
    {product.description}
  </Text>
)}

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => addToCart(product._id)} style={styles.cartButton}>
              <Text style={styles.cartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {addToCart(product._id); router.push('/cart')}} style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        <View className="mt-16"></View>
   <View className="flex flex-col items-center mt-20">

  
         <View className="flex flex-col items-center w-max">
            <Text className="text-2xl font-bold mb-4">Related Products</Text>
            <View className="w-20 h-0.5 bg-primary rounded-full mt-2"></View>
         </View>
       
         <ScrollView horizontal className="">
            {relatedProducts.filter((product)=>product.inStock).map((product, index)=>(
                <ProductCard key={index} product={product} />
            ))}
         </ScrollView>
         <View className="mt-10" />
         <TouchableOpacity  onPress={() => router.push(`/products`)} className="flex items-center border border-[#B4E197] rounded-full  py-4 px-4">
            <Text className="text-[#B4E197] font-bold text-3xl">See More</Text>
         </TouchableOpacity>

  </View>

      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  breadcrumb: {
    fontSize: 13,
    marginBottom: 8,
    color: "#888",
  },
  breadcrumbHighlight: {
    color: "#2ECC71", // highlight brand green
    fontWeight: "600",
  },
  content: {
    flexDirection: "column",
  },
  imageSection: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  thumbnailList: {
    marginRight: 12,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#E5E5E5",
    marginBottom: 10,
  },
  mainImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E5E5",
    backgroundColor: "#FAFAFA",
  },
  infoSection: {
    marginTop: 20,
  },
  productName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  star: {
    fontSize: 18,
    color: "#FFD700",
    marginRight: 2,
  },
  starInactive: {
    fontSize: 18,
    color: "#DDD",
    marginRight: 2,
  },
  ratingText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 6,
  },
  priceBox: {
    marginVertical: 14,
    padding: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  strike: {
    textDecorationLine: "line-through",
    color: "#999",
    fontSize: 14,
  },
  offerPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2ECC71",
  },
  taxNote: {
    color: "#999",
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginTop: 20,
    marginBottom: 6,
  },
  descriptionItem: {
    fontSize: 14,
    color: "#444",
    marginLeft: 10,
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  cartButton: {
    flex: 1,
    backgroundColor: "#FFE867",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cartButtonText: {
    color: "#1A1A1A",
    fontWeight: "700",
    fontSize: 16,
  },
  buyButton: {
    flex: 1,
    backgroundColor: "#B4E197",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buyButtonText: {
    color: "#1A1A1A",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ProductDetails;