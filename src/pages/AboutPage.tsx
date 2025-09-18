import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center p-6">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0"></div>

      {/* Home Button */}
      <Button
        className="absolute top-6 left-6 bg-white/30 backdrop-blur-sm text-black hover:bg-white/50"
        onClick={() => navigate("/")}
      >
        Home
      </Button>

      <div className="relative z-10 max-w-4xl w-full space-y-8">
        <h1 className="text-5xl font-extrabold text-white text-center">
          About Our Platform
        </h1>

        <Card className="p-8 bg-white/20 backdrop-blur-lg border border-white/30 text-white shadow-xl space-y-4">
          <p className="text-lg">
            Welcome to EcoLearn! Our mission is to make learning about the environment 
            engaging, interactive, and memorable. We combine lessons, quizzes, and 
            gamified experiences to inspire students to take action for a sustainable future.
          </p>
          <p className="text-lg">
            Whether it’s understanding climate change, exploring renewable energy, 
            or learning waste management strategies, our platform ensures every 
            student enjoys a fun and educational experience.
          </p>
        </Card>

        <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-md text-center">
          <h2 className="text-2xl font-semibold">Our Vision</h2>
          <p className="mt-2">
            To empower students with knowledge and tools to make sustainable choices 
            and protect our planet for future generations.
          </p>
        </Card>
      </div>
    </section>
  );
}
