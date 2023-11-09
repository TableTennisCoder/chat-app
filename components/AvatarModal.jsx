import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import {useState, useEffect} from "react";
import Background from "./ui/Background";
import {AntDesign} from "@expo/vector-icons";

const AvatarModal = ({isVisible, closeModal, getAvatar}) => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch("https://randomuser.me/api/?results=99");
      const data = await resp.json();
      setAvatars(data.results);
    }
    fetchData();
  }, []);

  function selectAvatarHandler(imageUrl) {
    getAvatar(imageUrl);
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <Background>
        <View style={styles.modalContainer}>
          <View style={styles.modalContainer__header}>
            <Text style={styles.modalContainer__caption}>
              Chose your Avatar
            </Text>
            <Pressable onPress={closeModal}>
              <AntDesign name="close" size={30} color="white" />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.imageContainer}>
            {avatars.map((avatar) => (
              <Pressable
                key={avatar.phone}
                onPress={() => selectAvatarHandler(avatar.picture.medium)}
              >
                <Image
                  source={{uri: avatar.picture.medium}}
                  style={styles.image}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Background>
    </Modal>
  );
};

export default AvatarModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  modalContainer__header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  modalContainer__caption: {
    color: "white",
    fontSize: 32,
    fontFamily: "BioSans-Bold",
  },
  buttonAdd: {
    marginVertical: 20,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 15,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
});
