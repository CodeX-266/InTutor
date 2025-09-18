import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserProfile {
  uid: string;
  name: string;
  email: string;
}

export default function FindFriends() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  // Get current logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Search users in Firestore
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", searchTerm.trim()));

    const querySnapshot = await getDocs(q);
    const users: UserProfile[] = [];

    querySnapshot.forEach((doc) => {
      if (doc.id !== currentUser?.uid) {
        users.push({
          uid: doc.id,
          name: doc.data().name,
          email: doc.data().email,
        });
      }
    });

    setResults(users);
    setLoading(false);
  };

  // Send friend request
  const sendFriendRequest = async (toUserId: string) => {
    if (!currentUser) return;

    await addDoc(collection(db, "friendRequests"), {
      from: currentUser.uid,
      to: toUserId,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    alert("Friend request sent!");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-8 flex flex-col items-center">
      <Card className="w-full max-w-lg p-6 bg-white/90 backdrop-blur-lg shadow-xl space-y-6">
        <h2 className="text-2xl font-bold text-center text-green-700">
          👥 Find Friends
        </h2>

        {/* Search */}
        <div className="flex gap-2">
          <Input
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        {/* Results */}
        <div className="space-y-4 mt-4">
          {results.length > 0 ? (
            results.map((user) => (
              <Card
                key={user.uid}
                className="p-4 flex justify-between items-center bg-gray-100"
              >
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <Button
                  onClick={() => sendFriendRequest(user.uid)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Add Friend
                </Button>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-600">No results</p>
          )}
        </div>
      </Card>
    </section>
  );
}
