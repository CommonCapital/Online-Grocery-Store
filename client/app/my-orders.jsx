import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { useAppContext } from '../context/AppContext';
import { dummyproducts } from '../components/ProductCard';
import { dummyAddress } from './cart';
import { Image } from 'react-native';
 export const dummyOrders = [
  {
    _id: "6575867487e8htijmrtb",
    userId: '7y6yu67g4758u5y35jkferu4tbt',
    items: [
       { 
        product: dummyproducts[3],
        quantity: 2,
        _id: "1"
},
    ],
    amount: 120,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "COD",
    isPaid: true,
    createdAt: new Date(),
    updatedAt: new Date(),

  }
];
const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const {currency} = useAppContext();
    const fetchMyOrders = async () => {
        setMyOrders(dummyOrders)
    };

    useEffect(() => {
        fetchMyOrders()
    }, [])
  return (
       <ScrollView className="mt-16 pb-16" >
           <View className="mb-8 flex flex-col" >
             <View className="flex flex-col w-max">
      <Text className="text-2xl font-medium uppercase">My Orders</Text>
      <View className="w-16 h-0.5 bg-primary rounded-full"></View>
             </View>
             {myOrders.map((order, index) => (
                <View key={index} className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl">
                    <View className="flex justify-between text-gray-400">
                   <Text>OrderId: {order._id}</Text>
                   <Text>Payment: {order.paymentType}</Text>
                   <Text>Total Amount: {currency}{order.amount}</Text>
                   </View>
                   {order.items.map((item, index) => (
                    <View >
                        <View className="flex items-center mb-4">
                            <View className="bg-primary/10 p-4 rounded-lg">
                               <Image source={{ uri: item.product.image[0] }} className="w-16  h-16"/>
                            </View>

                            <View>
                                   
                            </View>

                        </View>
                    </View>
                   ))}
                </View>
             ))}
              </View>
    </ScrollView>
  )
}

export default MyOrders