import {StyleSheet, View, Image, Button} from "react-native";
import {useState, useEffect} from "react";

import ImagePicker from "../components/ImagePicker";

import {db} from "../firebase";
import {getAuth} from "firebase/auth";
import {doc, getDoc, updateDoc} from "firebase/firestore";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    // fetch data of current user
    async function fetchUserData() {
      const docRef = doc(db, "Users", getAuth().currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    }

    fetchUserData();
  }, []);

  async function handleSaveImage() {
    const docRef = doc(db, "Users", getAuth().currentUser.uid);
    await updateDoc(docRef, {
      avatar: newImage,
    });
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: newImage !== "" ? newImage : user?.avatar,
        }}
        style={styles.image}
      />
      <ImagePicker onGetImage={(b64) => setNewImage(b64)} />
      {newImage !== "" ? <Button title="Save" onPress={handleSaveImage} /> : ""}
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
});
