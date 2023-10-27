import {StyleSheet, Text, View, Image, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";

const Contact = ({contact}) => {
  const navigation = useNavigation();

  function navigateToChatHandler() {
    navigation.navigate("Chat", {
      userInfos: contact,
    });
  }
  return (
    <Pressable onPress={navigateToChatHandler}>
      <View style={styles.container}>
        <Image source={{uri: contact.avatar}} style={styles.image} />
        <View style={styles.messageContainer}>
          <Text style={styles.name}>{contact.email}</Text>
          <View style={styles.messageWrapper}>
            <Text style={styles.message} numberOfLines={2} ellipsizeMode="tail">
              {contact.lastMessage}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 25,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  messageContainer: {
    flex: 1,
  },
  messageWrapper: {
    width: "100%",
  },
  name: {
    fontFamily: "Fredoka-SemiBold",
    marginBottom: 3,
  },
  message: {
    fontFamily: "Fredoka-Regular",
  },
});
