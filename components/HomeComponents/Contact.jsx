import {StyleSheet, Text, View, Image, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { processFontFamily } from "expo-font";

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
    marginBottom: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  messageContainer: {
    flex: 1,
    borderWidth: 1,
    paddingBottom: 10,
    borderBottomColor: "#27282A"
  },
  messageWrapper: {
    width: "100%",
  },
  name: {
    marginBottom: 3,
    color: "white",
    fontFamily: "BioSans-Bold"
  },
  message: {
    color: "#8C8C92",
    fontFamily: "BioSans-Regular"
  },
});
