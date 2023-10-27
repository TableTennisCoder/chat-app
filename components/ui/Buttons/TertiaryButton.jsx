import {StyleSheet, Text, View, Pressable} from "react-native";
import React from "react";

export default function TertiaryButton({text, buttonCaption, onPress, style}) {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Text style={styles.text}>{text}</Text>
      <Pressable onPress={onPress}>
        <Text style={styles.caption}> {buttonCaption}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
  },
  text: {
    fontFamily: "Fredoka-Medium",
    fontSize: 18,
    color: "#93A2A2"
  },
  caption: {
    fontFamily: "Fredoka-SemiBold",
    fontSize: 18,
    color: "#28C8C8"
  }
});
