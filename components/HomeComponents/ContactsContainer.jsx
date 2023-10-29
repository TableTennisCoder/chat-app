import {StyleSheet, FlatList} from "react-native";
import {useState, useEffect} from "react";
import {db} from "../../firebase";
import {getAuth} from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

import Contact from "./Contact";

/*** Here I have to extract all my contacts / chats from firebase based on my ID ***/
const ContactsContainer = () => {
  const currUser = getAuth().currentUser;
  const [userInfos, setUserInfos] = useState([]);

  // **** 1 Extract all the users (userIds) I added -> started a chat - store them in an array
  useEffect(() => {
    // Collection reference
    const chatRoomsRef = collection(db, "ChatRooms");

    const q = query(
      chatRoomsRef,
      where("participants", "array-contains", currUser.uid)
    );

    // Set to store unique Ids
    const userIdsSet = new Set();

    // loop through the matched elements and store the IDs in my state variable
    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const docData = change.doc.data();
        const otherUserIds = docData.participants.filter(
          (id) => id !== currUser.uid
        );

        // Add the user ids to my Set to ensure uniqueness
        otherUserIds.forEach((id) => userIdsSet.add(id));
      });

      // Convert the Set back to an Array
      const uniqueUserIds = Array.from(userIdsSet);

      // **** 2 Loop through that array and collect the user information of this specific user
      const userInformation = [];

      uniqueUserIds.forEach(async (userId) => {
        const userDocRef = doc(db, "Users", userId);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          userInformation.push(userData);
          setUserInfos(userInformation);
        }
      });
    });

    return () => {
      unsub();
    };
  }, []);

  // 3 This collection of data I have to pass in my FlatList to render all of that
  function renderContacts(itemData) {
    return <Contact contact={itemData.item} />;
  }

  return (
    <FlatList 
      data={userInfos}
      keyExtractor={(contact) => contact.id}
      renderItem={renderContacts}
      style={styles.contactsContainer}
    />
  );
};

export default ContactsContainer;

const styles = StyleSheet.create({
  contactsContainer: {
    marginTop: 20,
  },
});
