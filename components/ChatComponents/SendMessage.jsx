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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EDF0F7",
    borderRadius: 50,
    position: "relative",
  },
  sendButton: {
    backgroundColor: "#28C8C8",
    width: 45,
    height: 45,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    position: "absolute",
    right: 10,
  },
});
