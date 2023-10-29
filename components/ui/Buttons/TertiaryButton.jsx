import {StyleSheet, Text, View, Pressable} from "react-native";
import React from "react";
import { processFontFamily } from "expo-font";

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
    fontSize: 18,
    color: "#8C8C92",
    fontFamily: "BioSans-Regular"
  },
  caption: {
    fontSize: 18,
    color: "white",
    fontFamily: "BioSans-Bold"
  }
});
