import { Stack } from "expo-router";
import "../global.css";
import { AppContextProvider, useAppContext } from "../context/AppContext";
import Toast from "react-native-toast-message";
import "../i18n";
import Login from "../components/Login";
import { View } from "react-native";
function InnerLayout() {
  const { showUserLogin } = useAppContext();
  if (showUserLogin) {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white", // optional
      }}>
        <Login />
      </View>
    );
  } else {
    return <View />;
  }
}

export default function RootLayout() {
  return (
    <AppContextProvider>
      <InnerLayout />
      <Stack />
      <Toast />
    </AppContextProvider>
  );
}