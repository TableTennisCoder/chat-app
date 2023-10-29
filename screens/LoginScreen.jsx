import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import Background from "../components/ui/Background";
import PrimaryButton from "../components/ui/Buttons/PrimaryButton";
import CustomInput from "../components/ui/Inputs/CustomInput";
import TertiaryButton from "../components/ui/Buttons/TertiaryButton";
import SecondaryButton from "../components/ui/Buttons/SecondaryButton";

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
      <Background>
        <View style={styles.loginScreen__content}>
          <Text style={styles.heading}>ACCOUNT LOGIN</Text>
          <CustomInput
            placeholder="Email Address"
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
          <PrimaryButton onPress={handleLogin}>LOGIN</PrimaryButton>
          <TertiaryButton
            text="Don't have an account?"
            buttonCaption="Sign Up"
            onPress={() => navigation.replace("Signup")}
            style={{ marginTop: 15 }}
          />
          <Text style={styles.infoText}>Forgot your password?</Text>
          <SecondaryButton>RESET PASSWORD</SecondaryButton>
        </View>
      </Background>
    </KeyboardAvoidingView>
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
