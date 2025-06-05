import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheet, View } from "react-native";

type Props = {
  text: string;
} & TouchableOpacityProps;

const PrimaryButton = ({ text, onPress, disabled, ...props }: Props) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity
        {...props}
        disabled={disabled}
        style={styles.button}
        onPress={onPress}
        >
        <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
        width: '90%',
        padding: 12,
        borderRadius: 5,
        backgroundColor: '#4AB64A',
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container:{
        alignItems:'center'
    }
});
export default PrimaryButton;