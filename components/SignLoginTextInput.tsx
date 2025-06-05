import { StyleSheet, Text, View, TextInputProps, TextInput, ActivityIndicator } from 'react-native'
import { useController } from "react-hook-form";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Rubik_500Medium } from '@expo-google-fonts/rubik/500Medium';

type Props = {
  name: string;
  iconName: any;
  label: any;
  control: any;
} & TextInputProps;

const SignLoginTextInput = ({label, iconName, placeholder, name, control, readOnly, ...props}: Props) => {
  const{
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name: name,
    control,
  });
  
    return (
    <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {iconName && <MaterialIcons name={iconName} size={20} color="#666" />}
      
      <TextInput
        {...props}
        style={styles.input}
        readOnly={readOnly}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        />

      {error && <Text className="text-red-500 text-lg">{error.message}</Text>}
        </View>
    </View>
  )
}

export default SignLoginTextInput

const styles = StyleSheet.create({
    container: {
    marginVertical: 5,
    alignSelf: 'center',
    width: '90%'
  },
  label: {
    fontSize: 16,
    color: '#616161',
    marginBottom: 4,
    fontFamily: 'Rubik_500Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Rubik_500Medium'
  },
})