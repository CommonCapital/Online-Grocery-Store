import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { useRouter } from 'expo-router';
import { useAppContext } from '../context/AppContext';
import { Feather } from '@expo/vector-icons';


const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const router = useRouter();
    const {setShowUserLogin, setUser} = useAppContext();
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setUser({
            email: "test@gmail.kz",
            name: "Nursan",
        })
        setShowUserLogin(false);
    }
  return (
   <>
    <TouchableOpacity onPress={() => setShowUserLogin(false)} className="absolute top-0 left-0 bg-white text-gray-500 w-full max-w-md p-6 m-4 rounded-xl shadow shadow-black/10 z-50">
        <Feather name="x" size={24} color="black" />
    </TouchableOpacity>
  <View  className="bg-white text-gray-500 w-full max-w-md mx-4 p-6 rounded-xl shadow shadow-black/10">
     <Text className="text-2xl font-medium text-center self-center">
  <Text style={{ color: '#43B36A' }}>User</Text> {state === 'login' ? 'Login' : 'Sign Up'}
</Text>

      {state === 'register' && (
        <View className="w-full">
          <Text>Name</Text>
          <TextInput
            value={name}
            onChange={(e) => setName(e.nativeEvent.text)}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 text-[#FFD447]"
          />
        </View>
      )}

      <View className="w-full">
        <Text>Email</Text>
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.nativeEvent.text)}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 text-[#FFD447]"
          keyboardType="email-address"
        />
      </View>

      <View className="w-full">
        <Text>Password</Text>
        <TextInput
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 text-[#FFD447]"
          secureTextEntry
        />
      </View>

      <Text>
        {state === 'register' ? (
          <>
            Already have an account?{' '}
            <Text onPress={() => setState('login')} className="text-[#43B36A]">
              click here
            </Text>
          </>
        ) : (
          <>
            Create an account?{' '}
            <Text onPress={() => setState('register')} className="text-[#43B36A]">
              click here
            </Text>
          </>
        )}
      </Text>

      <TouchableOpacity onPress={onSubmitHandler}  className="bg-[#43B36A] transition-all  w-full py-2 rounded-md mt-2">
        <Text className="text-center text-[#FFD447]">
          {state === 'register' ? 'Create Account' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
   </>
  )
}

export default Login