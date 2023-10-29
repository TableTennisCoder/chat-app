import {StyleSheet, Text, View, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";

import Background from "../components/ui/Background";
import PrimaryButton from "../components/ui/Buttons/PrimaryButton";
import SecondaryButton from "../components/ui/Buttons/SecondaryButton";


const StartScreen = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <View style={styles.startscreen__content}>
        <Text style={styles.heading}>EUREKA!</Text>
        <Text style={styles.subtitle}>
          Great to have you here! Let's start the adventure!
        </Text>
      </View>
      <PrimaryButton onPress={() => navigation.navigate("Login")}>
        Login
      </PrimaryButton>
      <SecondaryButton
        style={{marginTop: 10}}
        onPress={() => navigation.navigate("Signup")}
      >
        Sign Up
      </SecondaryButton>
    </Background>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  startscreen__content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
    marginTop: 60,
    marginBottom: 45,
    gap: 10,
  },
  heading: {
    fontSize: 32,
    color: "white",
    fontFamily: "BioSans-Bold"
  },
  subtitle: {
    color: "#8C8C92",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "BioSans-Regular"
  },
});
