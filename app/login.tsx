import LoginForm from "../components/LoginForm";
import { useRouter } from "expo-router";
import {
  SafeAreaView
} from 'react-native-safe-area-context';

const Login = () => {
  const router = useRouter();

  return (
      <SafeAreaView style={{ flex: 1}}>
        <LoginForm onSuccess={() => router.replace("/home")} />
      </SafeAreaView>
  );
};

export default Login;