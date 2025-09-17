import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { EarthMascot } from "@/components/mascot/EarthMascot";
import { Play, Users, Trophy, BookOpen, Gamepad2, Star } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "6 Interactive Games",
      description: "Trash sorting, solar building, eco quizzes, and more!"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Badges & Rewards",
      description: "Earn achievements and climb the leaderboards"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Learn Real Science",
      description: "Climate change, recycling, renewable energy basics"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Student & Teacher Accounts",
      description: "Track progress and compete with classmates"
    }
  ];

  const games = [
    { name: "Trash Collector", emoji: "🗑️" },
    { name: "Solar Builder", emoji: "☀️" },
    { name: "Eco Quiz", emoji: "🧠" },
    { name: "Water Saver", emoji: "💧" },
    { name: "Carbon Runner", emoji: "🏃" },
    { name: "Climate Defender", emoji: "🌍" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🌍</div>
            <span className="text-2xl font-bold text-white">EcoEduPlay</span>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              onClick={() => navigate("/login")}
              variant="outline" 
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate("/signup")}
              className="bg-white text-green-600 hover:bg-white/90 font-semibold"
            >
              Sign Up
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-8">
            <EarthMascot size="lg" animation="wave" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Save the Planet
            <br />
            <span className="text-yellow-300">Through Play!</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            EcoEduPlay makes environmental education fun and engaging for students ages 10-18. 
            Learn about climate change, recycling, and renewable energy through interactive games!
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

      {/* Games Preview */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">6 Exciting Games</h2>
          <p className="text-xl text-white/80">Each game teaches important environmental concepts</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{game.emoji}</div>
                  <h3 className="font-semibold">{game.name}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Why Students Love EcoEduPlay</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-white/10 backdrop-blur border-white/20 text-white h-full">
                <CardContent className="p-6 text-center">
                  <div className="text-yellow-300 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/80 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="bg-white/10 backdrop-blur rounded-3xl p-12 border border-white/20"
        >
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-300 fill-current" />
              ))}
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Become an Eco Hero?
          </h2>
          
          <p className="text-xl text-white/80 mb-8">
            Join thousands of students learning to protect our planet through fun, interactive games.
          </p>
          
          <Button
            onClick={() => navigate("/signup")}
            size="lg"
            className="bg-green-500 text-white hover:bg-green-400 text-xl px-12 py-4 font-bold"
          >
            Start Your Journey Today
          </Button>
        </motion.div>
      </section>

      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-500/20 to-purple-600/20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LandingPage;