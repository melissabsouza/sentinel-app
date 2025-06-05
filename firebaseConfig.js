import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmt5K2h49NnE2c_w7pS8OBloBfc7B675Q",
  authDomain: "sentinel-app-468e1.firebaseapp.com",
  projectId: "sentinel-app-468e1",
  storageBucket: "sentinel-app-468e1.firebasestorage.app",
  messagingSenderId: "541619298877",
  appId: "1:541619298877:web:a8586f70c244ced3184054"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
