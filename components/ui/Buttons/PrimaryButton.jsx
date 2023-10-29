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
    backgroundColor: "white",
    borderRadius: 6,
    height: 50,
    width: 300
  },

  primaryButton__text: {
    color: "black",
    fontSize: 18,
    textAlign: 'center',
    fontFamily: "BioSans-Bold"
  },
});
