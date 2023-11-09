import {StyleSheet, Text, View, Button, Image} from "react-native";
import {useState} from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

const ImagePicker = ({onGetImage}) => {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  // need for ios
  async function verifyPermission() {
    // user hasn't allowed or denied camera
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      // opens dialog asking user if he wanna use camera
      const permissionResponse = await requestPermission();
      // true or false if user allow or denie camera
      return permissionResponse.granted;
    }

    // if user don't allow camera
    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permission",
        "You need to grant camera permission to use this feature."
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) return;

    const image = await launchCameraAsync({
      base64: true,
      allowsEditing: true,
      quality: 0.8,
    });

    const uri = image.assets[0].uri;
    onGetImage(uri);
  }

  return (
    <View style={{flex: 1}}>
      <Button title="Edit" onPress={takeImageHandler} />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    backgroundColor: "red",
  },
  image: {
    width: 100,
    height: 200,
  },
});
