import {StyleSheet, Text, TextInput, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";

const Searchbar = ({icon, placeholder, value, onChangeText}) => {
  return (
    <View style={styles.inputContainer}>
      <AntDesign name={icon} size={22} color="#335151" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    backgroundColor: "#EDF0F7",
    borderRadius: 50,
    height: 50,
    width: "100%",
    paddingHorizontal: 25,
    flexDirection: "row",
    gap: 10,
  },
  input: {
    color: "#335151",
    fontSize: 16,
  },
});
