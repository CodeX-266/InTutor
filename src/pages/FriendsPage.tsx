// src/pages/FriendsPage.tsx
import { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function FriendsPage() {
  const user = auth.currentUser;
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);

  // 🔹 Search users by email
  const handleSearch = async () => {
    if (!searchEmail) return toast.error("Enter an email to search!");
    const q = query(collection(db, "users"), where("email", "==", searchEmail));
    const snap = await getDocs(q);
    if (!snap.empty) {
      setSearchResult({ id: snap.docs[0].id, ...snap.docs[0].data() });
    } else {
      setSearchResult(null);
      toast.error("User not found");
    }
  };

  // 🔹 Send friend request
  const sendRequest = async () => {
    if (!user || !searchResult) return;
    await addDoc(collection(db, "friendRequests"), {
      from: user.uid,
      to: searchResult.uid,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    toast.success("Friend request sent!");
    setSearchResult(null);
    setSearchEmail("");
  };

  // 🔹 Listen for incoming friend requests
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "friendRequests"),
      where("to", "==", user.uid),
      where("status", "==", "pending")
    );
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRequests(data);
    });
    return () => unsub();
  }, [user]);

  // 🔹 Accept request
  const acceptRequest = async (reqId: string, fromUid: string) => {
    const ref = doc(db, "friendRequests", reqId);
    await updateDoc(ref, { status: "accepted" });

    const userRef = doc(db, "users", user!.uid);
    const friendRef = doc(db, "users", fromUid);

    await updateDoc(userRef, {
      friends: arrayUnion(fromUid),
    });
    await updateDoc(friendRef, {
      friends: arrayUnion(user!.uid),
    });

    toast.success("Friend request accepted!");
  };

  // 🔹 Reject request
  const rejectRequest = async (reqId: string) => {
    const ref = doc(db, "friendRequests", reqId);
    await updateDoc(ref, { status: "rejected" });
    toast.error("Friend request rejected");
  };

  // 🔹 Listen to friends and their points for leaderboard
  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const unsub = onSnapshot(userRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data?.friends?.length) {
          const friendsQuery = query(
            collection(db, "users"),
            where("uid", "in", data.friends)
          );
          const snap = await getDocs(friendsQuery);
          const friendsData = snap.docs.map((d) => d.data());
          // Sort by points descending
          friendsData.sort((a, b) => (b.points || 0) - (a.points || 0));
          setFriends(friendsData);
        } else {
          setFriends([]);
        }
      }
    });

    return () => unsub();
  }, [user]);

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        <h2 className="text-5xl font-bold text-center text-white drop-shadow-lg">
          Friends & Leaderboard
        </h2>

        {/* Search Users */}
        <Card className="p-6 bg-black/50 backdrop-blur-md shadow-lg border border-white/10 rounded-xl">
          <h3 className="text-2xl font-semibold mb-4 text-white">Find Friends</h3>
          <div className="flex gap-3">
            <Input
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Enter user email"
              className="flex-1 bg-black/30 text-white border-white/20 focus:border-yellow-400"
            />
            <Button onClick={handleSearch} className="bg-yellow-400 text-black hover:bg-yellow-300">
              Search
            </Button>
          </div>
          {searchResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex justify-between items-center p-3 bg-black/40 rounded-lg text-white"
            >
              <span>{searchResult.name} ({searchResult.email})</span>
              <Button onClick={sendRequest} className="bg-green-500 hover:bg-green-600 text-white">
                Add Friend
              </Button>
            </motion.div>
          )}
        </Card>

        {/* Incoming Friend Requests */}
        <Card className="p-6 bg-black/50 backdrop-blur-md shadow-lg border border-white/10 rounded-xl">
          <h3 className="text-2xl font-semibold mb-4 text-white">Friend Requests</h3>
          {requests.length === 0 && <p className="text-white">No requests at the moment.</p>}
          {requests.map((req) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-between items-center mb-2 p-3 bg-black/40 rounded-lg text-white"
            >
              <span>Request from {req.from}</span>
              <div className="flex gap-2">
                <Button onClick={() => acceptRequest(req.id, req.from)} className="bg-blue-500 hover:bg-blue-600 text-white">
                  Accept
                </Button>
                <Button onClick={() => rejectRequest(req.id)} className="bg-red-500 hover:bg-red-600 text-white">
                  Reject
                </Button>
              </div>
            </motion.div>
          ))}
        </Card>

        {/* Friends List & Leaderboard */}
        <Card className="p-6 bg-black/50 backdrop-blur-md shadow-lg border border-white/10 rounded-xl">
          <h3 className="text-2xl font-semibold mb-4 text-white">Your Friends & Leaderboard</h3>
          {friends.length === 0 ? (
            <p className="text-white">You don’t have friends yet 😢</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {friends.map((f, idx) => (
                <motion.div
                  key={f.uid}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 bg-black/30 rounded-lg text-center border border-white/20 hover:bg-yellow-400 hover:text-black transition-all cursor-pointer"
                >
                  <p className="font-semibold text-white">{idx + 1}. {f.name}</p>
                  <p className="text-sm text-white/70">{f.email}</p>
                  <p className="text-sm font-bold text-green-400">{f.points || 0} pts</p>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
