import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import Background from "../ui/Background";
import PrimaryButton from "../ui/Buttons/PrimaryButton";

import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import CustomInput from "../ui/Inputs/CustomInput";

const ModalNewFriend = ({ isVisible, closeModalHandler }) => {
  const currUser = getAuth().currentUser;
  const [friendId, setFriendId] = useState("");

  // Function to handle user input and update the userInput state
  const handleUserInput = (id) => {
    setFriendId(id);
  };

  // add the new user data to firestore
  async function addNewFriendToFirestore(participants, lastMessage) {
    const chatRoomsCollection = collection(db, "ChatRooms"); // Create a reference to the collection

    const docRef = await addDoc(chatRoomsCollection, {
      participants,
      lastMessage,
    });

    const chatRoomId = docRef.id;
    return chatRoomId;
  }

  // call the function of saving the data in database
  async function handleAddFriend() {
    const roomParticipants = [currUser.uid, friendId];
    const chatRoomId = await addNewFriendToFirestore(
      roomParticipants,
      "Hey, this is a random text."
    );

    closeModalHandler();
    setFriendId("");
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <Background>
        <View style={styles.modalContainer}>
          <View style={styles.modalContainer__header}>
            <Text style={styles.modalContainer__caption}>Add New Friend</Text>
            <Pressable onPress={closeModalHandler}>
              <AntDesign name="close" size={30} color="white" />
            </Pressable>
          </View>
          <View style={{ alignItems: "center" }}>
            <CustomInput
              placeholder="Your friend's ID"
              value={friendId}
              onChangeText={handleUserInput}
            />
            <PrimaryButton style={styles.buttonAdd} onPress={handleAddFriend}>
              Add friend
            </PrimaryButton>
          </View>
        </View>
      </Background>
    </Modal>
  );
};

export default ModalNewFriend;

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
});
