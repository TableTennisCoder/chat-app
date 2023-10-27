import {StyleSheet, TextInput, View} from "react-native";

export default function CustomInput({placeholder, value, onChangeText, keyboardType, isPassword}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#93A2A2"
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
    backgroundColor: "#EDF0F7",
    borderRadius: 50,
    height: 60,
    width: 300,
    paddingHorizontal: 25
  },
  input: {
    color: "#335151",
    fontFamily: 'Fredoka-Medium',
    fontSize: 18
  },
});
