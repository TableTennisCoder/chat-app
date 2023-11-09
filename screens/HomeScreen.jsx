import {View, Text, Button, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import {auth} from "../firebase";
import {getAuth, signOut} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";
import {AntDesign} from "@expo/vector-icons";

import {SearchBar} from "@rneui/themed";
import ContactsContainer from "../components/HomeComponents/ContactsContainer";
import ModalNewFriend from "../components/HomeComponents/ModalNewFriend";
import Background from "../components/ui/Background";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setUser(getAuth().currentUser);
  }, []);

  function handleChangeInput(text) {
    setUserInput(text);
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <Background>
      <View style={styles.wrapper}>
        <View style={styles.wrapper__header}>
          <Text style={styles.header__caption}>Chats</Text>
          <AntDesign
            name="adduser"
            size={30}
            color="white"
            onPress={() => setIsVisible(true)}
          />
          <ModalNewFriend
            isVisible={isVisible}
            closeModalHandler={() => setIsVisible(false)}
            getRoomIdHandler={(id) => setRoomId(id)}
          />
        </View>
        <SearchBar
          placeholder="Suchen"
          value={userInput}
          onChangeText={handleChangeInput}
          platform="ios"
          containerStyle={{backgroundColor: "transparent"}}
          inputContainerStyle={{backgroundColor: "#27282A"}}
          inputStyle={{color: "white"}}
        />
        <ContactsContainer />
        <Button title="Ausloggen" onPress={handleLogout} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  wrapper__header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  header__caption: {
    color: "white",
    fontSize: 32,
    fontFamily: "BioSans-Bold",
  },
});

export default HomeScreen;
