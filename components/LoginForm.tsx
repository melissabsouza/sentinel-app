import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import SignLoginTextInput from '@/components/SignLoginTextInput';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useForm } from 'react-hook-form';
import PrimaryButton from '@/components/PrimaryButton';
import { Rubik_400Regular } from '@expo-google-fonts/rubik/400Regular';
import { Rubik_500Medium } from '@expo-google-fonts/rubik/500Medium';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';

type Props = {
  onSuccess: () => void;
};

const LoginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(6, "Senha precisa ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginForm = ({ onSuccess }: Props) => {

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium
  });

  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const [mode, setMode] = useState<'login' | 'register'>('login');

  const { isPending, mutate, error } = useMutation({
    mutationFn: async ({ email, password }: LoginFormData) => {
      if (mode === 'login') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login bem-sucedido:", userCredential?.user);
        return userCredential;
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Registro bem-sucedido:", userCredential?.user);
        return userCredential;
      }
    },
    onSuccess: (userCredential) => {
      console.log("onSuccess() → user:", userCredential?.user);
      onSuccess();
    },
    onError: (err) => {
      console.error("Erro no Firebase Auth:", err);
    }
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>Login</Text>
        <View style={styles.underline} />
      </View>

      <View>
        {isPending && <ActivityIndicator size="large" color="#36c32c" />}
        {error && (
          <>
            <Text style={styles.error}>{error.message}</Text>
            {console.log("Erro completo:", error)}
          </>
        )}

        <SignLoginTextInput
          label='E-mail'
          name="email"
          iconName='email'
          control={control}
          placeholder='Digite seu e-mail'
        />

        <SignLoginTextInput
          label='Senha'
          name="password"
          iconName='password'
          control={control}
          placeholder='Digite sua senha'
          secureTextEntry
        />

        <View style={styles.button}>
          <PrimaryButton
            text="Entrar"
            onPress={() => {
              setMode('login');
              handleSubmit(onSubmit)();
            }}
            disabled={isPending}
          />
        </View>
      </View>

      <Text style={styles.textlog}>
        Não tem uma conta?
        <Link href="/signup" style={{ color: '#4AB64A' }}>
          {' '}Registrar
        </Link>
      </Text>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 35
  },
  text: {
    fontFamily: 'Rubik_500Medium',
    color: '#424242',
    fontSize: 38
  },
  underline: {
    bottom: 4,
    width: '15%',
    height: 3,
    backgroundColor: '#4AB64A',
    borderRadius: 1,
  },
  button: {
    paddingTop: 140
  },
  textlog: {
    fontFamily: 'Rubik_400Regular',
    alignSelf: 'center',
    margin: 10
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10
  }
});
