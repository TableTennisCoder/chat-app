import {StyleSheet, Text, View, Image} from "react-native";
import PrimaryButton from "../components/ui/Buttons/PrimaryButton";
import SecondaryButton from "../components/ui/Buttons/SecondaryButton";
import {useNavigation} from "@react-navigation/native";

const StartScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.startscreen}>
      <Image
        source={require("../assets/images/start.png")}
        style={styles.image}
      />
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
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  startscreen: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    marginTop: 35,
    marginBottom: 20,
    width: "95%",
  },
  startscreen__content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
    marginBottom: 45,
    gap: 10,
  },
  heading: {
    fontFamily: "Fredoka-Bold",
    fontSize: 28,
    color: "#335151",
  },
  subtitle: {
    color: "#93A2A2",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Fredoka-Medium",
  },
});
