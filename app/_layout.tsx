import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "./../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import AuthProvider from "@/components/AuthProvider";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAppIsReady(true);
      SplashScreen.hide();
    });
    return () => unsubscribe();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signin" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="edit/[id]" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="dark" />
      </QueryClientProvider>
    </AuthProvider>
  );
}
