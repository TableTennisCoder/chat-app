import {StyleSheet, Pressable, View, Text} from "react-native";
import React from "react";

const PrimaryButton = ({children, onPress, style}) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <View style={styles.primaryButton}>
        <Text style={styles.primaryButton__text}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  primaryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#28C8C8",
    borderRadius: 50,
    height: 60,
    width: 300
  },

  primaryButton__text: {
    color: "white",
    fontFamily: 'Fredoka-Medium',
    fontSize: 22,
    textAlign: 'center'
  },
});
