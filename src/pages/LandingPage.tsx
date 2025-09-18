import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "@fontsource/cinzel-decorative";
import "@fontsource/inter"; // Professional font
import { Button } from "@/components/ui/button";
import { Play, Users } from "lucide-react";
import { auth } from "@/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import bgImage from "@/assets/background.jpg";




const Landing: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<FirebaseUser | null>(null);

  // Track logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-start h-screen w-screen overflow-hidden font-inter"
      style={{
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-4 z-30 bg-black/30 backdrop-blur-sm">
        <h1
          className="text-white text-2xl font-bold cursor-pointer"
          style={{ fontFamily: "'Cinzel Decorative', serif" }}
          onClick={() => navigate("/")}
        >
          InTutor
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-6 text-white text-lg font-semibold">
            <button
              onClick={() => navigate("/courses")}
              className="hover:text-green-300 transition-colors"
            >
              Courses
            </button>
            <button
              onClick={() => navigate("/friends")}
              className="hover:text-green-300 transition-colors flex items-center gap-1"
            >
              <Users className="w-5 h-5" /> Friends
            </button>
            <button
              onClick={() => navigate("/about")}
              className="hover:text-green-300 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="hover:text-green-300 transition-colors"
            >
              Contact
            </button>
          </div>

          {/* User display */}
          <div className="flex items-center space-x-2">
            {user ? (
              <span className="px-4 py-2 text-white font-semibold bg-green-600 rounded-lg">
                {user.displayName || user.email}
              </span>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 border border-white/50 rounded-lg text-white bg-white/10 backdrop-blur hover:bg-white/20 transition-all font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-5 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 transition-all shadow-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Floating Shapes */}
      <motion.div
        className="absolute w-24 h-24 bg-white rounded-full opacity-30 z-10"
        animate={{ y: [0, 20, 0], x: [0, 15, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-white rounded-full opacity-25 z-10"
        animate={{ y: [0, -25, 0], x: [0, -15, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Hero Section */}
      <section className="relative z-20 text-center px-4 flex flex-col items-center justify-center h-full max-w-full mt-24">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full max-w-6xl text-center px-6 py-20 rounded-3xl bg-black/40 "
        >
          <h1
            style={{
              color: "white",
              textShadow: "0 0 15px rgba(255,255,255,0)",
              fontSize: "12vw",
              lineHeight: 1,
              fontFamily: "'Cinzel Decorative', serif",
            }}
          >
            InTutor
          </h1>

          <p className="mt-6 text-2xl md:text-4xl text-white opacity-90 font-semibold mb-8">
            Gamified Environmental Learning
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="bg-yellow-400 text-green-800 hover:bg-yellow-300 text-xl px-8 py-4 font-bold"
            >
              <Play className="w-6 h-6 mr-2" />
              Play Demo
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              size="lg"
              variant="outline"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-xl px-8 py-4"
            >
              Start Learning Free
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-500/20 to-purple-600/20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Landing;
