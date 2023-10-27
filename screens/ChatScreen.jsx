import {StyleSheet, View, FlatList} from "react-native";
import {useState, useEffect, useLayoutEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import {db} from "../firebase";
import {getAuth} from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import SendMessage from "../components/ChatComponents/SendMessage";
import Message from "../components/ChatComponents/Message";
import ProfileImageHeader from "../components/ChatComponents/ProfileImageHeader";

const Chat = ({route}) => {
  const userId = route.params.userInfos.id;
  const userName = route.params.userInfos.email;
  const avatar = route.params.userInfos.avatar;

  const myId = getAuth().currentUser.uid;
  const [roomId, setRoomId] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: userName,
      // headerLeft: () => <ProfileImageHeader profileImage={avatar} />,
    });
  }, [navigation, userName, avatar]);

  // ***** GET THE ROOM ID ***** //
  useEffect(() => {
    // Create a reference to the ChatRooms collection
    const chatRoomsRef = collection(db, "ChatRooms");

    // Create a query to find the chat room where both users are participants
    const q = query(
      chatRoomsRef,
      where("participants", "array-contains", userId),
      where("isGroup", "==", false)
    );

    // Subscribe to the query to get the chat room(s) that match the condition
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        setRoomId(doc.id);
      });
    });

    return () => {
      unsubscribe();
    };
  }, [userId, myId]);

  // ***** SEND MESSAGES -> STORE THEM IN FIRESTORE ***** //
  async function addMessageToFirestore() {
    const messageColl = collection(db, "Messages");
    await addDoc(messageColl, {
      text: userInput,
      sender: myId,
      timestamp: Date.now(),
      chatRoomId: roomId,
    });

    setUserInput("");
  }

  // ***** RETREIVE REAL TIME UPDATES FROM FIRSTORE AND DISPLAY ***** //
  useEffect(() => {
    if (!roomId) return;

    // Create reference to messages collection
    const messRef = collection(db, "Messages");
    // Create query to get messages for current chat room
    const messQuery = query(
      messRef,
      where("chatRoomId", "==", roomId),
      orderBy("timestamp")
    );

    // Subscribe to channel to get real-time updates
    const messUnsub = onSnapshot(messQuery, (snapshot) => {
      const updatedMessages = [];
      snapshot.forEach((doc) => {
        updatedMessages.push(doc.data());
      });
      setMessages(updatedMessages);
    });

    return () => {
      messUnsub();
    };
  }, [roomId]);

  // ***** DISPLAY THE MESSAGES ***** //
  function displayMessages(itemData) {
    return <Message isMyMessage={itemData.item.sender === myId ? true : false}>{itemData.item.text}</Message>;
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.timestamp}
        renderItem={displayMessages}
        style={styles.chatSection}
      />
      <View style={styles.sendSection}>
        <SendMessage
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
          onPress={addMessageToFirestore}
        />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    gap: 20,
  },
  chatSection: {
    flex: 1,
  },
  sendSection: {},
});

// // Create a query to find chat rooms where the user is a participant
// const queryUser = query(
//   chatRoomsRef,
//   where("participants", "array-contains", userId)
// );

// // Create a query to find chat rooms where I am a participant
// const queryMyId = query(
//   chatRoomsRef,
//   where("participants", "array-contains", myId)
// );

// // combine the queries and get the chat where we both are in
// const unsubscribe = onSnapshot(queryUser, (snapshot) => {
//   onSnapshot(queryMyId, (mySnapshot) => {
//     snapshot.forEach((userDoc) => {
//       mySnapshot.forEach((myDoc) => {
//         if (userDoc.id === myDoc.id) {
//           setRoomId(userDoc.id);
//         }
//       });
//     });
//   });
// });
