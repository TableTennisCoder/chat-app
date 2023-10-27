import {StyleSheet, Pressable, View, Text} from "react-native";
import React from "react";

const SecondaryButton = ({children, onPress, style}) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <View style={styles.primaryButton}>
        <Text style={styles.primaryButton__text}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  primaryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 300,
    height: 60,
    borderWidth: 2,
    borderColor: "#28C8C8",
  },

  primaryButton__text: {
    color: "#28C8C8",
    fontFamily: 'Fredoka-Medium',
    fontSize: 22,
    textAlign: "center",
  },
});
