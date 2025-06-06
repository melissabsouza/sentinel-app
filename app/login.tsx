import LoginForm from "../components/LoginForm";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const router = useRouter();
  const replaceLoginScreen = () => {
    router.dismissAll();
    router.replace("/home");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginForm onSuccess={replaceLoginScreen} />
    </SafeAreaView>
  );
};

export default Login;
