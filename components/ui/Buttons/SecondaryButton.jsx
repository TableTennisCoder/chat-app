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
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
    height: 50,
    width: 300,
  },

  primaryButton__text: {
    color: "white",
    fontSize: 16,
    textAlign: 'center',
    fontFamily: "BioSans-Bold"
  },
});
