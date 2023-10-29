import {StyleSheet, TextInput, View} from "react-native";

export default function CustomInput({placeholder, value, onChangeText, keyboardType, isPassword}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#8C8C92"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={isPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    backgroundColor: "black",
    borderWidth: 1.,
    borderColor: "white",
    borderRadius: 3,
    height: 50,
    width: 300,
    paddingHorizontal: 15,
  },
  input: {
    color: "white",
    fontSize: 16,
    fontFamily: "BioSans-Regular"
  },
});
