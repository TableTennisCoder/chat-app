import {Pressable, StyleSheet, View} from "react-native";
import CustomInput from "../ui/Inputs/CustomInput";
import {Feather} from "@expo/vector-icons";

const SendMessage = ({value, onChangeText, onPress}) => {
  return (
    <View style={styles.messagebox}>
      <CustomInput
        placeholder="Type a message..."
        value={value}
        onChangeText={onChangeText}
        keyboardType="default"
        isPassword={false}
      />
      <Pressable style={styles.sendButton} onPress={onPress}>
        <Feather name="send" size={28} color="white" />
      </Pressable>
    </View>
  );
};

export default SendMessage;

const styles = StyleSheet.create({
  messagebox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "relative",
  },
  sendButton: {
    backgroundColor: "transparent",
    width: 45,
    height: 45,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    position: "absolute",
    right: 20
  },
});
