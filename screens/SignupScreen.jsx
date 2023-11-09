import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {useState} from "react";

import {auth, db} from "../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";
import {useNavigation} from "@react-navigation/native";

import {errorMessage} from "../getFirebaseErrorMessages";
import AvatarModal from "../components/AvatarModal";
import Onboarding from "react-native-onboarding-swiper";
import Background from "../components/ui/Background";
import CustomInput from "../components/ui/Inputs/CustomInput";
import PrimaryButton from "../components/ui/Buttons/PrimaryButton";
import SecondaryButton from "../components/ui/Buttons/SecondaryButton";
import TertiaryButton from "../components/ui/Buttons/TertiaryButton";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorStyle, setErrorStyle] = useState(false);

  const navigation = useNavigation();

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        addUserToFirestore(
          user.uid,
          userName,
          email,
          avatarUrl,
          "These sentences are commonly used as placeholders or for testing purposes and don't have any specific meaning"
        );
      })
      .catch((error) => {
        Alert.alert("Signup Failed!", errorMessage(error.code), [{text: "OK"}]);
        setErrorStyle(true);
      });
  };

  // Add new user to Firestore
  async function addUserToFirestore(uid, name, email, avatar = "https://randomuser.me/api/portraits/med/men/83.jpg", lastMessage) {
    await setDoc(doc(db, "Users", uid), {
      id: uid,
      name: name,
      email: email,
      avatar: avatar,
      lastMessage: lastMessage,
    });
  }

  return (
    <Background>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.loginScreen__content}>
          <Text style={styles.heading}>REGISTER</Text>
          <CustomInput
            placeholder="Email Address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            errorStyle={errorStyle}
          />
          <CustomInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            isPassword
            errorStyle={errorStyle}
          />
          <CustomInput
            placeholder="Username"
            value={userName}
            onChangeText={(text) => setUserName(text)}
            keyboardType="default"
            errorStyle={errorStyle}
          />
          <SecondaryButton onPress={() => setIsVisible(true)}>
            Choose your Avatar
          </SecondaryButton>
          <AvatarModal
            isVisible={isVisible}
            closeModal={() => setIsVisible(false)}
            getAvatar={(url) => setAvatarUrl(url)}
          />
          <PrimaryButton onPress={handleSignup}>REGISTER NOW</PrimaryButton>
          <TertiaryButton
            text="Already have an account?"
            buttonCaption="Login"
            onPress={() => navigation.replace("Login")}
            style={{marginTop: 15}}
          />
        </View>
      </TouchableWithoutFeedback>
    </Background>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  image: {
    width: "60%",
  },
  loginScreen__content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
    marginTop: 60,
    marginBottom: 15,
    gap: 20,
  },
  heading: {
    fontSize: 28,
    color: "white",
    marginBottom: 10,
    fontFamily: "BioSans-Bold",
  },
  text: {
    color: "white",
    fontFamily: "BioSans-SemiBold",
    fontSize: 18,
  },
});
