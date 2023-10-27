import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import {useState} from "react";

import {auth, db} from "../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";
import {useNavigation} from "@react-navigation/native";

import CustomInput from "../components/ui/Inputs/CustomInput";
import PrimaryButton from "../components/ui/Buttons/PrimaryButton";
import TertiaryButton from "../components/ui/Buttons/TertiaryButton";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        addUserToFirestore(
          user.uid,
          "Maxiboy",
          email,
          "https://randomuser.me/api/portraits/men/91.jpg",
          "These sentences are commonly used as placeholders or for testing purposes and don't have any specific meaning"
        );
      })
      .catch((error) => console.log(error.message));
  };

  // Add new user to Firestore
  async function addUserToFirestore(uid, name, email, avatar, lastMessage) {
    await setDoc(doc(db, "Users", uid), {
      id: uid,
      name: name,
      email: email,
      avatar: avatar,
      lastMessage: lastMessage,
    });
  }

  return (
    <KeyboardAvoidingView style={styles.loginScreen} behavior="height">
      <View style={styles.loginScreen__content}>
        <Text style={styles.heading}>Sign Up</Text>
        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          isPassword
        />
        <PrimaryButton onPress={handleSignup}>Sign Up</PrimaryButton>
        <TertiaryButton
          text="Already have an account?"
          buttonCaption="Login"
          onPress={() => navigation.replace("Login")}
          style={{marginTop: 15}}
        />
      </View>
      <Image
        source={require("../assets/images/loginSignup.png")}
        style={styles.image}
      />
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    width: "60%",
  },
  loginScreen__content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
    marginTop: 50,
    marginBottom: 15,
    gap: 15,
  },
  heading: {
    fontFamily: "Fredoka-Bold",
    fontSize: 28,
    color: "#335151",
    marginBottom: 10,
  },
});
