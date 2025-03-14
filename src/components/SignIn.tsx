import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>Welcome to AI Video Bakery</Text>
      <TextInput style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 10, color: 'white' }} placeholderTextColor='gray' placeholder='Email' />
      <TextInput style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, color: 'white' }} placeholderTextColor='gray' placeholder='Password' secureTextEntry={true} />
      <TouchableOpacity style={{ backgroundColor: 'gray', padding: 10, width: '80%', alignItems: 'center' }} onPress={() => navigation.navigate('Home')}>
        Sign in with Email
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: 'gray', padding: 10, width: '80%', alignItems: 'center', marginTop: 10 }} onPress={() => {}}>
        Log in with Google
      </TouchableOpacity>
      <Text style={{ color: 'white', marginTop: 20 }} onPress={() => navigation.navigate('SignUp')}>Don't have an account? Sign up now</Text>
      <Text style={{ color: 'white', marginTop: 10 }} onPress={() => {}}>Forgot password?</Text>
    </View>
  );
} 