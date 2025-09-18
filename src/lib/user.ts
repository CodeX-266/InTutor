// src/lib/user.ts
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

export async function createUserDocIfNotExists({
  uid,
  name,
  email,
}: {
  uid: string;
  name?: string | null;
  email?: string | null;
}) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      uid,
      name: name ?? null,
      email: email ?? null,
      avatar: null,
      points: 0,
      friends: [], // store friend UIDs
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}
