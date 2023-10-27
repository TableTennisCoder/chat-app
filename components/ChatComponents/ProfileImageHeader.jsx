import {StyleSheet, View, Image} from "react-native";

const ProfileImageHeader = ({profileImage}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: profileImage}} style={styles.profileImage} />
    </View>
  );
};

export default ProfileImageHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
