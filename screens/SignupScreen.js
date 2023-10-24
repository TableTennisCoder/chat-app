import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import React from "react";
import { useState } from "react";
import { auth } from "../firebase";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <View>
      <Text>SignupScreen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({});
