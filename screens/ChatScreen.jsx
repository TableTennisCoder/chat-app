import {
  StyleSheet,
  View,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import {useState, useEffect, useLayoutEffect, useRef} from "react";
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

import Background from "../components/ui/Background";
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
  const flatListRef = useRef(null);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: userName,
      // headerLeft: () => <ProfileImageHeader profileImage={avatar} />,
    });
  }, [navigation, userName, avatar]);

  // ***** GET THE ROOM ID ***** //
  useEffect(() => {
    async function getRoomId() {
      // Create a reference to the ChatRooms collection
      const chatRoomsRef = collection(db, "ChatRooms");

      // // Create a query to find chat rooms where the user is a participant
      const queryUser = query(
        chatRoomsRef,
        where("participants", "array-contains", userId)
      );

      // Create a query to find chat rooms where I am a participant
      const queryMyId = query(
        chatRoomsRef,
        where("participants", "array-contains", myId)
      );

      // combine the queries and get the chat where we both are in
      const unsubscribe = onSnapshot(queryUser, (snapshot) => {
        onSnapshot(queryMyId, (mySnapshot) => {
          snapshot.forEach((userDoc) => {
            mySnapshot.forEach((myDoc) => {
              if (userDoc.id === myDoc.id) {
                setRoomId(userDoc.id);
              }
            });
          });
        });
      });
    }

    getRoomId();
  }, [userId, myId]);

  // ***** SEND MESSAGES -> STORE THEM IN FIRESTORE ***** //
  async function addMessageToFirestore() {
    if (roomId && userInput !== "") {
      const messageColl = collection(db, "Messages");
      await addDoc(messageColl, {
        text: userInput,
        sender: myId,
        timestamp: Date.now(),
        chatRoomId: roomId,
      });

      setUserInput("");
      Keyboard.dismiss();
    } else {
      console.log("RoomID is null, cannot send message");
    }
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
    return (
      <Message
        isMyMessage={itemData.item.sender === myId ? true : false}
        time={itemData.item.timestamp}
      >
        {itemData.item.text}
      </Message>
    );
  }

  return (
    <Background>
      <View style={styles.wrapper}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior="padding"
          keyboardVerticalOffset={70}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(message) => message.timestamp}
            renderItem={displayMessages}
            style={styles.chatSection}
            onContentSizeChange={() =>
              flatListRef.current.scrollToEnd({animated: true})
            }
          />
          <View style={styles.sendSection}>
            <SendMessage
              value={userInput}
              onChangeText={(text) => setUserInput(text)}
              onPress={addMessageToFirestore}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Background>
  );
};

export default Chat;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    gap: 20,
  },
  chatSection: {
    flex: 1,
  },
  sendSection: {
    paddingTop: 20,
  },
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
