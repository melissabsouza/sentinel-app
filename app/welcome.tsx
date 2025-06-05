import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useFonts } from '@expo-google-fonts/rubik/useFonts';
import { Rubik_600SemiBold } from '@expo-google-fonts/rubik/600SemiBold';
import { Rubik_500Medium } from '@expo-google-fonts/rubik/500Medium';
import { useRouter } from 'expo-router';


const welcomeImg = require("../assets/images/welcome.png")
const arrow = require("../assets/images/arrow.png")

const WelcomeScreen = () => {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Rubik_600SemiBold,
        Rubik_500Medium
    })
  return (
        <View>
        <Image source={welcomeImg} style={styles.img}></Image>
        <Text style={styles.title}>Sentinel</Text>

        <Text style={styles.subtitle}>Sua comunidade, mais segura.</Text>
        <Text style={styles.subtitle}>Juntos, antecipamos e protegemos.</Text>

        <View style={styles.continue}>
            <Text style={styles.subtitle}>Continuar</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
                <Image source={arrow} style={styles.svg}></Image>
            </TouchableOpacity>
        </View>
        </View>
  )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    continue:{
        flexDirection: 'row',
        alignSelf: 'flex-end',
        gap: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 20

    },
    img:{
        width: '100%',
        height:'80%'
    },
    title:{
        fontSize: 40,
        color: '#424242',
        fontFamily: "Rubik_600SemiBold",
        marginLeft: 20
    },
    subtitle:{
        fontSize: 14,
        marginLeft: 20,
        color: '#BDBDBD',
        letterSpacing: 0.2,
        lineHeight: 20,
        fontFamily: 'Rubik_500Medium'
    },
    svg:{
        width: 33,
        height:25
    }
})