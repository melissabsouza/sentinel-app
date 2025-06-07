import React from "react";
import SignUpForm from "@/components/SignUpForm";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();
  const replaceSignUpScreen = () => {
    router.dismissAll();
    router.replace("/home");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignUpForm onSuccess={replaceSignUpScreen} />
    </SafeAreaView>
  );
};

export default SignUp;
