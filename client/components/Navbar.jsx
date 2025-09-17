import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../context/AppContext";
import ProfilePicture from "./ProfilePicture";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAppContext();
  const { showUserLogin, setShowUserLogin, setSearchQuery, searchQuery, getCartCount } = useAppContext();
  const handleSearchSubmit = () => {
  if (searchQuery.trim().length > 0) {
    router.push("/products");
  }
};

  const logout = async () => {
    setUser(null);
    router.push("/");
  };

 


  return (
    <View className="bg-white px-5 pt-5 pb-3 border-b border-gray-200 shadow-sm ">
      {/* Top Section */}
      <View className="flex-row items-center justify-between">
        {/* Logo */}
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text className="text-xl font-bold text-[#43B36A] tracking-tight">
            Casper
            <Text className="text-[#FFD447]">Market</Text>
          </Text>
        </TouchableOpacity>
        <View><LanguageSwitcher /></View>
 
   <TouchableOpacity onPress={() => router.push("/cart")}>
              <View className="relative">
                <Ionicons name="cart-outline" size={26} color="#43B36A" />
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{getCartCount()}</Text>
                </View>
              </View>
            </TouchableOpacity>
        {/* Menu Icon */}
        <TouchableOpacity
          onPress={() => setOpen(!open)}
          accessibilityLabel="Toggle Menu"
        >
          <Feather name={open ? "x" : "menu"} size={26} color="#4b5563" />
        </TouchableOpacity>
       
      </View>
 {/* Cart */}
          
      {/* Expanded Menu */}
      {open && (
        <View className="mt-5 space-y-5 gap-2">
          {/* Profile Avatar */}
          <View className="items-center">
            {!user ? (
              <Image
                source={require("../assets/images/default-avatar.jpg")}
                style={styles.image}
              />
            ) : (
              <ProfilePicture />
            )}
          </View>

          {/* Navigation Links */}
          <View className="space-y-2 gap-4">
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text className="text-gray-800 text-lg font-bold">{t("home")}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/products")}>
              <Text className="text-gray-800 text-lg font-bold">{t("all_products")}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/contact")}>
              <Text className="text-gray-800  font-bold text-lg">{t("contact")}</Text>
            </TouchableOpacity>
                 <TouchableOpacity onPress={() => router.push("/my-orders")}>
                  <Text className="text-gray-800 text-base font-medium">📦 My Orders</Text>
                </TouchableOpacity>
          </View>

          {/* Cart & Auth Actions */}
          <View className="flex-row justify-between items-center gap-2">
           

            {/* Auth */}
            {!user ? (
              <TouchableOpacity
               
                className="bg-[#43B36A] px-10 py-4 rounded-full shadow-sm"
                onPress={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
              >
                <Text className="text-[#FFD447] font-semibold text-sm">Login</Text>
              </TouchableOpacity>
            ) : (
              <View className="items-end">
                <TouchableOpacity onPress={() => router.push("/my-orders")}>
                  <Text className="text-gray-800 text-base font-medium">📦 My Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-[#FFD447] px-5 py-2 mt-2 rounded-full shadow-sm"
                  onPress={logout}
                >
                  <Text className="text-orange-600 font-semibold text-sm">Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
<View className="pt-10" />
          {/* Search Bar */}
          <View className="flex-row items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-100 shadow-sm">
          <TextInput
  placeholder="Search fresh items…"
  className="flex-1 text-gray-700"
  placeholderTextColor="#9ca3af"
  onChangeText={setSearchQuery}
  value={searchQuery}
  onSubmitEditing={handleSearchSubmit}
/>
            <Feather name="search" size={20} color="#9ca3af" />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    resizeMode: "cover",
  },
  cartBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#FF7A00",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});