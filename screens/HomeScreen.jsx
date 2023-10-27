import {View, Text, Button, StyleSheet, FlatList} from "react-native";
import {useEffect, useState} from "react";
import {auth} from "../firebase";
import {getAuth, signOut} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";
import {AntDesign} from "@expo/vector-icons";

import Searchbar from "../components/HomeComponents/Searchbar";
import ContactsContainer from "../components/HomeComponents/ContactsContainer";
import ModalNewFriend from "../components/HomeComponents/ModalNewFriend";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setUser(getAuth().currentUser);
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapper__header}>
        <Text style={styles.header__caption}>Messages</Text>
        <AntDesign
          name="adduser"
          size={30}
          color="#335151"
          onPress={() => setIsVisible(true)}
        />
        <ModalNewFriend
          isVisible={isVisible}
          closeModalHandler={() => setIsVisible(false)}
          getRoomIdHandler={(id) => setRoomId(id)}
        />
      </View>
      <Searchbar icon="search1" placeholder="Search" />
      <ContactsContainer />

      <Text>{user?.email}</Text>
      <Text>{user?.uid}</Text>
      <Button title="Ausloggen" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  wrapper__header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  header__caption: {
    color: "#335151",
    fontFamily: "Fredoka-SemiBold",
    fontSize: 32,
  },
});

export default HomeScreen;
