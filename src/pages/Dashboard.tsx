import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { EarthMascot } from "@/components/mascot/EarthMascot";
import { GameCard } from "@/components/ui/game-card";
import { BadgeDisplay } from "@/components/ui/badge-display";
import { Progress } from "@/components/ui/progress";
import { Trash2, Brain, Zap, Droplets, Sun, Gamepad2 } from "lucide-react";
import { auth, db } from "@/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import "@fontsource/poppins";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userPoints, setUserPoints] = useState(0); 
  const [userName, setUserName] = useState("");
  const [currentQuote, setCurrentQuote] = useState(0);
  const [friendsData, setFriendsData] = useState<any[]>([]);

  const ecoQuotes = [
    "Every small action makes a BIG difference! 🌱",
    "You're helping save our planet, one game at a time! 🌍",
    "Recycling is like giving Earth a big hug! 🤗",
    "Solar power = Earth power! ☀️",
  ];

  const games = [
    { id: "trash-collector", title: "Trash Collector", description: "Sort waste into the right bins and save the environment!", icon: <Trash2 className="w-16 h-16 text-green-400" />, difficulty: "Easy" as const, points: 50, path: "/games/trash-collector" },
    { id: "solar-builder", title: "Solar Panel Builder", description: "Build solar panels and power up the city with clean energy!", icon: <Sun className="w-16 h-16 text-yellow-400" />, difficulty: "Medium" as const, points: 100, path: "/games/solar-builder" },
    { id: "eco-quiz", title: "Eco Quiz Adventure", description: "Test your environmental knowledge and become an eco-expert!", icon: <Brain className="w-16 h-16 text-blue-400" />, difficulty: "Easy" as const, points: 75, path: "/games/eco-quiz" },
    { id: "water-saver", title: "Water Saver", description: "Stop water waste and become a conservation hero!", icon: <Droplets className="w-16 h-16 text-cyan-400" />, difficulty: "Medium" as const, points: 80, path: "/games/water-saver" },
    { id: "carbon-runner", title: "Carbon Runner", description: "Run through a green world while avoiding pollution!", icon: <Gamepad2 className="w-16 h-16 text-red-400" />, difficulty: "Hard" as const, points: 120, path: "/games/carbon-runner" },
    { id: "climate-defender", title: "Climate Defender", description: "Match eco-symbols and defend our planet!", icon: <Zap className="w-16 h-16 text-purple-400" />, difficulty: "Medium" as const, points: 90, path: "/games/climate-defender" },
  ];

  const badges = [
    { id: "eco-saver", name: "Eco Saver", icon: "🌱", description: "Earned 100 points", earned: userPoints >= 100, requiredPoints: 100 },
    { id: "planet-hero", name: "Planet Hero", icon: "🌍", description: "Earned 500 points", earned: userPoints >= 500, requiredPoints: 500 },
    { id: "guardian-earth", name: "Guardian of Earth", icon: "🏆", description: "Earned 1000 points", earned: userPoints >= 1000, requiredPoints: 1000 },
    { id: "solar-master", name: "Solar Master", icon: "☀️", description: "Complete Solar Panel Builder", earned: false, requiredPoints: 0 },
    { id: "quiz-genius", name: "Quiz Genius", icon: "🧠", description: "Get 5 quiz questions right in a row", earned: false, requiredPoints: 0 },
    { id: "recycling-champion", name: "Recycling Champion", icon: "♻️", description: "Sort 100 items correctly", earned: false, requiredPoints: 0 },
  ];

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % ecoQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fetch current user points and friends for leaderboard
  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) return;

      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      if (userData) {
        setUserPoints(userData.points || 0);
        setUserName(userData.name || "Eco Explorer");

        // Fetch friends points
        const friendsIds = userData.friends || [];
        if (friendsIds.length > 0) {
          const q = query(collection(db, "users"), where("uid", "in", [...friendsIds, auth.currentUser.uid]));
          const snap = await getDocs(q);
          const data = snap.docs.map(doc => doc.data());
          data.sort((a, b) => b.points - a.points);
          setFriendsData(data);
        }
      }
    };

    fetchUserData();
  }, []);

  const currentLevel = Math.floor(userPoints / 100) + 1;
  const progressToNext = userPoints % 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white font-poppins">
      <Header userPoints={userPoints} userName={userName} />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <EarthMascot size="lg" animation="wave" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Welcome back, {userName}!
          </h1>

          <motion.p key={currentQuote} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-xl text-gray-300 mb-8">
            {ecoQuotes[currentQuote]}
          </motion.p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>Level {currentLevel}</span>
              <span>{progressToNext}/100 to next level</span>
            </div>
            <Progress value={progressToNext} className="h-3 bg-gray-700" />
          </div>
        </motion.section>

        {/* Games Grid */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-400">🎮 Choose Your Adventure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <motion.div key={game.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
                <div className="bg-gray-800 hover:bg-gray-700 hover:shadow-xl hover:scale-105 transition-all rounded-xl border border-gray-700 p-4">
                  <GameCard
                    title={game.title}
                    description={game.description}
                    icon={game.icon}
                    difficulty={game.difficulty}
                    points={game.points}
                    onPlay={() => navigate(game.path)}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Badges Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(72,187,120,0.6)] transition-all duration-500 border border-gray-700">
            <h2 className="text-3xl font-extrabold text-white mb-6 text-center tracking-wide drop-shadow-lg">
              🏆 Your Badges
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 ${
                    badge.earned
                      ? "border-green-400 bg-gradient-to-br from-green-900 via-green-800 to-green-900"
                      : "border-gray-600 bg-gray-800/40"
                  } shadow-lg hover:scale-105 hover:border-green-400 transition-all duration-300 cursor-pointer`}
                >
                  <div
                    className={`text-4xl mb-2 ${
                      badge.earned ? "animate-pulse" : "opacity-60"
                    }`}
                  >
                    {badge.icon}
                  </div>
                  <p className="font-semibold text-white text-center text-sm">
                    {badge.name}
                  </p>
                  <p className="text-xs text-gray-400 text-center mt-1">
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>


        {/* Leaderboard Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.0 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
            🏆 Friends Leaderboard
          </h2>
          <div className="space-y-3 max-w-md mx-auto">
            {friendsData.length === 0 ? (
              <p className="text-center text-gray-300">No friends yet 😢</p>
            ) : (
              (() => {
                const user = auth.currentUser;

                // Filter out the logged-in user from friendsData
                const friendsWithoutUser = friendsData.filter(f => f.uid !== user?.uid);

                // Assign random points to friends
                const friendsWithPoints = friendsWithoutUser.map(f => ({
                  ...f,
                  points: Math.floor(Math.random() * 1000),
                }));

                // Assign random points to the current user
                const currentUserData = user
                  ? { uid: user.uid, name: user.displayName || "You", points: Math.floor(Math.random() * 1000) }
                  : null;

                // Combine current user + friends and sort descending
                const allUsers = currentUserData
                  ? [currentUserData, ...friendsWithPoints]
                  : [...friendsWithPoints];
                allUsers.sort((a, b) => b.points - a.points);

                return allUsers.map((f, index) => (
                  <div
                    key={f.uid}
                    className={`flex justify-between p-4 rounded-xl shadow transition-all ${
                      f.uid === user?.uid
                        ? "bg-yellow-500 text-black font-bold"
                        : "bg-gray-800 text-white hover:shadow-lg"
                    }`}
                  >
                    <span>{index + 1}. {f.name}</span>
                    <span>{f.points} pts</span>
                  </div>
                ));
              })()
            )}
          </div>
        </motion.section>

      </main>
    </div>
  );
};

export default Dashboard;
