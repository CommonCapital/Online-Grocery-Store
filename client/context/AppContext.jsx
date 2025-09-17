import React, { createContext, useContext, useEffect, useState } from "react";
import { dummyproducts } from "../components/ProductCard";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message"; // ✅ corrected import

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [currency, setCurrency] = useState("₸KZT"); // ✅ make it dynamic
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
 const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    setProducts(dummyproducts);
  };

  const addToCart = (itemId) => {
    
    let cartData = JSON.parse(JSON.stringify(cartItems));;

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    Toast.show({ type: "success", text1: "Item added to cart" });
  };

  const updateCartItem = (itemId, quantity) => {
    let cartData = JSON.parse(JSON.stringify(cartItems));
    cartData[itemId] = quantity;

    setCartItems(cartData);
    Toast.show({ type: "info", text1: "Cart updated" });
  };

  const removeFromCart = (itemId) => {
    let cartData = JSON.parse(JSON.stringify(cartItems));

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);
    Toast.show({ type: "error", text1: "Item removed from cart" });
  };


  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems){
      totalCount += cartItems[item]
    }
    return totalCount;
  }

  const getCartAmount = () =>{
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if(cartItems[items] > 0){
        totalAmount += itemInfo.offerPrice * cartItems[items];

      }
    }
    return Math.floor(totalAmount * 100) / 100;
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    router,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    setCurrency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery, setSearchQuery, getCartCount, getCartAmount
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};