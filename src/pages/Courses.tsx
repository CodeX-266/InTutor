// src/pages/Courses.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { QuizDemo } from "@/components/QuizDemo";
import { TopicsGrid } from "@/components/TopicsGrid";
import { Header } from "@/components/layout/Header";

const Courses = () => {
  const navigate = useNavigate();
  const userPoints = 150; // You can fetch this dynamically if needed
  const userName = "Eco Explorer"; // Or fetch from user context

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Header userPoints={userPoints} userName={userName} />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 px-4 bg-gradient-to-r from-green-800 via-gray-900 to-purple-900 shadow-lg"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Explore Our Courses
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Learn, play, and earn rewards with our interactive eco-education platform.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-400 rounded-xl font-semibold shadow-lg text-white transition-all"
        >
          Back to Home
        </motion.button>
      </motion.section>

      <main className="container mx-auto px-6 py-12">
        {/* Topic Grid Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Topics</h2>
          <div className="bg-gray-800/50 p-6 rounded-3xl shadow-lg">
            <TopicsGrid />
          </div>
        </motion.section>

        {/* Quiz Demo Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Quiz Demo</h2>
          <div className="bg-gray-800/50 p-6 rounded-3xl shadow-lg">
            <QuizDemo />
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Courses;
