import React from 'react'
import SignInForm from '@/components/SignInForm'
import {
  SafeAreaView
} from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';


const Login = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1}}>
        <SignInForm onSuccess={() => router.replace("/")} />
      </SafeAreaView>
  )
}

export default Login