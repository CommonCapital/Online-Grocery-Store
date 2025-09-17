import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Navbar from "../components/Navbar";
import MainBanner from "../components/MainBanner";
import { usePathname, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Categories from "../components/Categories";
import BestOffers from "../components/BestOffers";
import BottomBanner from "../components/BottomBanner";
import { useTranslation } from "react-i18next";
import NewsletterSection from "../components/NewsLatter";
import Footer from "../components/Footer";


export default function Index() {
  const router = useRouter();
  const isSellerPath = usePathname().includes("seller");
const { t } = useTranslation();
  return (
    <View className="flex-1 bg-white">
      {/* Navbar */}
      <Navbar className={isSellerPath ? "mt-10" : "mt-10 px-5"} />
      <ScrollView className="flex-grow">
      {/* Main Banner */}
      <View className={isSellerPath ? "mt-10" : "mt-10 px-5"}>
        <MainBanner />
      </View>

      {/* Spacer */}
      <View />

      {/* Hero Text */}
      <View className="px-6">
        <Text className="text-center text-[26px] font-extrabold leading-tight text-gray-900">
          {t("freshness_title")}
        </Text>
        <Text className="text-center text-[24px] font-semibold text-gray-700 mt-1">
         {t("freshness_subtitle")}
        </Text>
      </View>

      {/* CTA Buttons */}
      <View className="mt-10 space-y-4 px-10">
        {/* Shop Now */}
        <TouchableOpacity
          onPress={() => router.push("/products")}
          className="bg-[#FFD447] rounded-full py-4 flex-row items-center justify-center space-x-2 shadow-sm"
        >
          <Text className="text-black font-bold text-base">{t("shop_now")}</Text>
          <Feather name="arrow-right" size={20} color="black" />
        </TouchableOpacity>

        {/* Explore Deals */}
        <TouchableOpacity
          onPress={() => router.push("/products")}
          className="flex-row items-center justify-center space-x-2 py-3"
        >
          <Text className="text-[#43B36A] font-semibold text-base">
            {t("explore_details")}
          </Text>
          <Feather name="arrow-right" size={20} color="#43B36A" />
        </TouchableOpacity>
      </View>

    <View>
      <Categories />
      <View className="mt-10"/>
      < BestOffers/>
       <View className="mt-10"/>
       <BottomBanner />
<View className="mt-10"/>
       <NewsletterSection />
      
   <Footer />
    </View>
    


      </ScrollView>
    </View>
  );
}
