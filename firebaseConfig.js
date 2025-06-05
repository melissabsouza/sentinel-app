import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1OXGYilEyL4qva0-x9ekk1ENejegByT4",
  authDomain: "sentinel-app-gs.firebaseapp.com",
  projectId: "sentinel-app-gs",
  storageBucket: "sentinel-app-gs.firebasestorage.app",
  messagingSenderId: "717379664356",
  appId: "1:717379664356:web:ee8164644b370b9fe96ff1",
  measurementId: "G-8Z01X8NEY8"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
