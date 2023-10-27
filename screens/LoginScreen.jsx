import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import {useState} from "react";
import {auth} from "../firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";

import PrimaryButton from "../components/ui/Buttons/PrimaryButton";
import CustomInput from "../components/ui/Inputs/CustomInput";
import TertiaryButton from "../components/ui/Buttons/TertiaryButton";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigation.replace("HomeScreen");
    });
  };

  return (
    <KeyboardAvoidingView style={styles.loginScreen} behavior="padding">
      <View style={styles.loginScreen__content}>
        <Text style={styles.heading}>Login</Text>
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
        <PrimaryButton onPress={handleLogin}>Login</PrimaryButton>
        <TertiaryButton
          text="Don't have an account?"
          buttonCaption="Sign Up"
          onPress={() => navigation.replace("Signup")}
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

export default LoginScreen;

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
