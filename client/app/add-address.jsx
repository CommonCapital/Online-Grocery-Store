import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAppContext } from "../context/AppContext";
  import Footer from "../components/Footer"
const AddAddress = () => {
    const router = useRouter();
    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });
    const handleChange = (name, value) => {
  setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
};

    const onSubmitHandler = async (event) => {
        event.preventDefault();
    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏠 Add New Address</Text>
      
       
        <TextInput
  placeholder="First Name"
  style={styles.input}
  value={address.firstName}
  onChangeText={(text) => handleChange('firstName', text)}
/>

    <TextInput
  placeholder="Last Name"
  style={styles.input}
  value={address.lastName}
  onChangeText={(text) => handleChange('lastName', text)}
/>

      <TextInput
  placeholder="Email Address"
  style={styles.input}
  value={address.email}
  onChangeText={(text) => handleChange('email', text)}
/>

     <TextInput
  placeholder="Street"
  style={styles.input}
  value={address.street}
  onChangeText={(text) => handleChange('street', text)}
/>

      <TextInput
  placeholder="City"
  style={styles.input}
  value={address.city}
  onChangeText={(text) => handleChange('city', text)}
/>

    <TextInput
  placeholder="State"
  style={styles.input}
  value={address.state}
  onChangeText={(text) => handleChange('state', text)}
/>

      <TextInput
  placeholder="Zip Code"
  style={styles.input}
  value={address.zipcode}
  onChangeText={(text) => handleChange('zipcode', text)}
/>

     <TextInput
  placeholder="Country"
  style={styles.input}
  value={address.country}
  onChangeText={(text) => handleChange('country', text)}
/>

     <TextInput
  placeholder="Phone Address"
  style={styles.input}
  value={address.phone}
  onChangeText={(text) => handleChange('phone', text)}
/>


      <TouchableOpacity style={styles.saveButton} onPress={onSubmitHandler}>
        <Text style={styles.saveButtonText}>Save Address</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
      <View className="mt-10"/>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f9fff9", flexGrow: 1 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#388E3C" },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    fontSize: 14,
  },

  saveButton: {
    backgroundColor: "#388E3C",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  cancelButton: {
    backgroundColor: "#ffebee",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: { color: "#C62828", fontSize: 16, fontWeight: "bold" },
});

export default AddAddress;

