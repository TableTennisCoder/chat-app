import {StyleSheet, Text, View, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";

import telegramLogo from "../assets/images/telegram.png";
import Background from "../components/ui/Background";
import PrimaryButton from "../components/ui/Buttons/PrimaryButton";
import SecondaryButton from "../components/ui/Buttons/SecondaryButton";

const StartScreen = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <View style={{flex: 1, alignItems: "center"}}>
        <View style={styles.startscreen__content}>
          <Text style={styles.heading}>EUREKA!</Text>
          <Text style={styles.subtitle}>
            Great to have you here! Let's start the adventure!
          </Text>
        </View>
        <PrimaryButton onPress={() => navigation.replace("Login")}>
          Login
        </PrimaryButton>
        <SecondaryButton
          style={{marginTop: 10}}
          onPress={() => navigation.replace("Signup")}
        >
          Sign Up
        </SecondaryButton>
        <Image source={telegramLogo} style={styles.logo}/>
      </View>
    </Background>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  startscreen__content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
    marginTop: 180,
    marginBottom: 45,
    gap: 10,
  },
  heading: {
    fontSize: 32,
    color: "white",
    fontFamily: "BioSans-Bold",
  },
  subtitle: {
    color: "#8C8C92",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "BioSans-Regular",
  },
  logo: {
    marginTop: 60,
    marginRight: 20,
    width: 150,
    height: 150
  }
});
