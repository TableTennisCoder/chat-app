import {StyleSheet, Text, View} from "react-native";

const Message = ({children, isMyMessage}) => {
  return (
    <View
      style={[
        styles.message__container,
        isMyMessage ? styles.myMessage : styles.usersMessage,
      ]}
    >
      <Text style={styles.message__text}>{children}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  message__container: {
    backgroundColor: "#E3EAF5",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
    backgroundColor: "#27282A",
  },
  usersMessage: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "#27282A"
  },
  message__text: {
    color: "white",
    fontSize: 16,
  },
});
