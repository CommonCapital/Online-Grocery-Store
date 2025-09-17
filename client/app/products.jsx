import { View, Text, ScrollView, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import Navbar from '../components/Navbar';
import { usePathname, useRouter } from 'expo-router';
import ProductCard from '../components/ProductCard';
import { Feather } from '@expo/vector-icons';
import Categories from '../components/Categories';
import Footer from "../components/Footer";

const AllProducts = () => {
  const isSellerPath = usePathname().includes("seller");
    const {products, searchQuery,setSearchQuery} = useAppContext();
    const [filteredProducts, setFilteredProducts] = React.useState([]);
    const router = useRouter();
   useEffect(() => {
     if(searchQuery.length > 0) {
        setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
     } else {
        setFilteredProducts(products)
     }
   }, [products, searchQuery]);
   const handleSearchSubmit = () => {
  if (searchQuery.trim().length > 0) {
    router.push("/products");
  }
};

  return (
    <ScrollView className="mt-1 flex flex-col" >
      <View className="mt-1 flex flex-col" >
          <Navbar className={isSellerPath ? "mt-10" : "mt-10 px-5"} />
        <View className="flex flex-col w-max">
      <Text className="text-2xl font-bold mt-5 ms-5">All Products</Text>
       <View className="w-16 h-0.5 bg-primary rounded-full"> </View>
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
      <View>
        <Categories />
      </View>
      <View className="mt-10"/>
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
      <View key={rowIndex} className="flex-row w-1/2">
        {pair.map((product, colIndex) => (
          <ProductCard key={colIndex} product={product} />
        ))}
      </View>
    ))}

    
    </ScrollView>
    
</ScrollView>

    <View className="mt-10"/>
    <Footer />
    </View>
    </ScrollView>
  )
}

export default AllProducts