import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {useState} from "react";
import {auth} from "../firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";

import {errorMessage} from "../getFirebaseErrorMessages";
import Background from "../components/ui/Background";
import PrimaryButton from "../components/ui/Buttons/PrimaryButton";
import CustomInput from "../components/ui/Inputs/CustomInput";
import TertiaryButton from "../components/ui/Buttons/TertiaryButton";
import SecondaryButton from "../components/ui/Buttons/SecondaryButton";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorStyle, setErrorStyle] = useState(false);

  const navigation = useNavigation();

  const handleLogin = () => {
    setErrorStyle(false);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.replace("HomeScreen");
      })
      .catch((error) => {
        Alert.alert("Login Failed!", errorMessage(error.code), [
          {
            text: "OK",
          },
        ]);
        setErrorStyle(true);
      });
  };

  return (
    <Background>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.loginScreen__content}>
          <Text style={styles.heading}>ACCOUNT LOGIN</Text>
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
          <PrimaryButton onPress={handleLogin}>LOGIN</PrimaryButton>
          <TertiaryButton
            text="Don't have an account?"
            buttonCaption="Sign Up"
            onPress={() => navigation.replace("Signup")}
            style={{marginTop: 15}}
          />
          <Text style={styles.infoText}>Forgot your password?</Text>
          <SecondaryButton>RESET PASSWORD</SecondaryButton>
        </View>
      </TouchableWithoutFeedback>
    </Background>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
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
  infoText: {
    color: "white",
    fontFamily: "BioSans-Regular",
    fontSize: 15,
    marginTop: 50,
  },
});
