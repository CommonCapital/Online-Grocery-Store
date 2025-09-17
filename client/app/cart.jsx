import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { useAppContext } from "../context/AppContext";
import { useRouter } from "expo-router";
export const dummyAddress = [];
const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);
  const router = useRouter();
  const { products, currency, cartItems, removeFromCart, getCartCount, updateCartItem, getCartAmount } = useAppContext();
  const [cartArray, setCartArray] = useState([]);
  
  const [addresses, setAddresses] = useState(dummyAddress);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [paymentOption, setPaymentOption] = useState("COD");

  const placeOrder = async () => { };

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  return products.length > 0 && cartItems ? (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cart Items */}
      <Text style={styles.title}>
        🛒 Shopping Cart <Text style={styles.itemsCount}>({getCartCount()} Items)</Text>
      </Text>

      {cartArray.map((product, index) => (
        <View key={index} style={styles.productCard}>
          {/* Image */}
          <TouchableOpacity onPress={() => router.push(`/products/${product._id}`)} style={styles.imageWrapper}>
            <Image source={{ uri: product.image[0] }} style={styles.productImage} />
          </TouchableOpacity>

          {/* Info */}
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDetails}>Weight: {product.weight || "N/A"}</Text>
            <View style={styles.qtyRow}>
              <Text style={styles.qtyLabel}>Qty: {getCartCount(product._id)}</Text>
              <Picker
                selectedValue={product.quantity}
                style={styles.qtyPicker}
                onValueChange={(value) => updateCartItem(product._id, Number(value))}
              >
                {[...Array(10).keys()].map((num) => (
                  <Picker.Item key={num + 1} label={(num + 1).toString()} value={num + 1} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Price & Remove */}
          <View style={styles.priceActions}>
            <Text style={styles.priceText}>
              {currency}{product.offerPrice * product.quantity}
            </Text>
            <TouchableOpacity onPress={() => removeFromCart(product._id)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Continue Shopping */}
      <TouchableOpacity onPress={() => router.push("/products")} style={styles.continueShopping}>
        <Text style={styles.continueShoppingText}>← Continue Shopping</Text>
      </TouchableOpacity>

      {/* Order Summary at Bottom */}
      <View style={styles.rightSection}>
        <Text style={styles.summaryTitle}>📦 Order Summary</Text>

        {/* Address */}
        <Text style={styles.subTitle}>Delivery Address</Text>
        <View style={styles.addressRow}>
          <Text style={styles.addressText}>
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
              : "No address found"}
          </Text>
          <TouchableOpacity onPress={() => setShowAddress(!showAddress)}>
            <Text style={styles.linkText}>Change</Text>
          </TouchableOpacity>
        </View>

        {showAddress && (
          <View style={styles.addressDropdown}>
            {addresses.map((address, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedAddress(address);
                  setShowAddress(false);
                }}
              >
                <Text>{address.street}, {address.city}, {address.state}, {address.country}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => router.push("/add-address")}>
              <Text style={styles.addAddress}>+ Add address</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Payment Method */}
        <Text style={styles.subTitle}>Payment Method</Text>
        <Picker onValueChange={(value) => setPaymentOption(value)} style={styles.paymentPicker}>
          <Picker.Item label="Cash On Delivery" value="COD" />
          <Picker.Item label="Online Payment" value="Online" />
        </Picker>

        {/* Summary */}
        <View style={styles.summaryRow}>
          <Text>Price</Text>
          <Text>{currency}{getCartAmount()}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Shipping Fee</Text>
          <Text style={{ color: "green" }}>Free</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Tax (2%)</Text>
          <Text>{currency}{(getCartAmount() * 0.02).toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalText}>{currency}{(getCartAmount() * 1.02).toFixed(2)}</Text>
        </View>

        {/* Place Order */}
        <TouchableOpacity onPress={placeOrder} style={styles.placeOrder}>
          <Text style={styles.placeOrderText}>
            {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  ) : null;
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f9fff9" },

  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12, color: "#388E3C" },
  itemsCount: { fontSize: 14, color: "#FBC02D" },

  productCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    alignItems: "center",
  },
  imageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  productImage: { width: "100%", height: "100%" },

  productInfo: { flex: 2, marginLeft: 12 },
  productName: { fontWeight: "bold", fontSize: 16, color: "#333" },
  productDetails: { fontSize: 13, color: "#666" },

  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  qtyLabel: { marginRight: 6, fontWeight: "500" },
  qtyPicker: { height: 36, width: 80, backgroundColor: "#f0f0f0", borderRadius: 6 },

  priceActions: { alignItems: "flex-end" },
  priceText: { fontWeight: "bold", fontSize: 15, color: "#2E7D32" },
  removeButton: { marginTop: 8, paddingVertical: 4, paddingHorizontal: 8, backgroundColor: "#ffebee", borderRadius: 4 },
  removeButtonText: { color: "#C62828", fontSize: 12 },

  continueShopping: { marginTop: 10 },
  continueShoppingText: { color: "#388E3C", fontWeight: "500" },

  rightSection: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginTop: 20,
  },
  summaryTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8, color: "#388E3C" },
  subTitle: { fontSize: 14, fontWeight: "bold", marginTop: 16, color: "#388E3C" },

  addressRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 },
  addressText: { flex: 1, marginRight: 8, fontSize: 13, color: "#444" },
  linkText: { color: "#FBC02D", fontWeight: "500" },

  addressDropdown: { marginTop: 8, backgroundColor: "#fdfdfd", padding: 8, borderRadius: 8, borderWidth: 1, borderColor: "#ddd" },
  addAddress: { color: "#388E3C", textAlign: "center", marginTop: 8 },

  paymentPicker: { backgroundColor: "#f0f0f0", marginTop: 8, borderRadius: 8 },

  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, borderTopWidth: 1, borderColor: "#eee", paddingTop: 8 },
  totalText: { fontSize: 16, fontWeight: "bold", color: "#388E3C" },

  placeOrder: { marginTop: 16, padding: 14, backgroundColor: "#388E3C", alignItems: "center", borderRadius: 8 },
  placeOrderText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default Cart;