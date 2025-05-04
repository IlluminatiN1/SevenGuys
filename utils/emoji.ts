import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Emoji } from "../data/data";

const firestore = getFirestore();

export async function fetchEmoji() {
    const querySnapshot = await getDocs(collection(firestore, "emoji"));
    const emojis = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().icon,
      color: doc.data().color,
    })) as Emoji[];

    return emojis;
}