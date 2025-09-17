import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
const BestOffers = () => {
  const {t} = useTranslation();
  const {products} = useAppContext();
  return (
    <View className="bg-yellow-100 p-4 rounded-lg">
      <Text className="text-lg font-bold">{t("best_offers")}</Text>
      <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              className="flex-row grid-cols-3 gap-3 mt-6"
            >
              {products.filter((product) => product.inStock).slice(0, 5).map((product, index) => (
<ProductCard key={index} product={product}/>
              ))}
              
            </ScrollView>
    </View>
  );
};

export default BestOffers;