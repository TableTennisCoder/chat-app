import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Background = ({ children }) => {
  return (
    <LinearGradient colors={["#0F0F0F", "#000000"]} style={styles.background}>
      {children}
    </LinearGradient>
  );
};

export default Background;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
