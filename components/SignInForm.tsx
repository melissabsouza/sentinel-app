import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import SignLoginTextInput from '@/components/SignLoginTextInput';
import { createUserWithEmailAndPassword } from "firebase/auth";
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

const SignUpSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(6, "Senha precisa ter pelo menos 6 caracteres"),
});

type SignUpFormData = z.infer<typeof SignUpSchema>;

const SignInForm = ({ onSuccess }: Props) => {

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium
  });

  const { control, handleSubmit } = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignUpSchema),
  });

  const { isPending, mutate, error } = useMutation({
    mutationFn: async ({ email, password }: SignUpFormData) => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    },
    onSuccess: () => {
      onSuccess();
    }
  });

  const onSubmit = (data: SignUpFormData) => {
    mutate(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>Sign In</Text>
        <View style={styles.underline} />
      </View>

      <View>
        {isPending && <ActivityIndicator size="large" color="#36c32c" />}
        {error && <Text style={styles.error}>{error.message}</Text>}

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
            text="Registrar"
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
          />
        </View>
      </View>

      <Text style={styles.textlog}>
        Já tem uma conta?
        <Link href="/login" style={{ color: '#4AB64A' }}>
          {' '}Entrar
        </Link>
      </Text>
    </View>
  );
};

export default SignInForm;

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
