import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

import climateImage from "@/assets/climate-change.jpg";
import renewableImage from "@/assets/renewable-energy.jpg";
import wasteImage from "@/assets/waste-management.jpg"; 

interface Topic {
  id: string;
  title: string;
  description: string;
  image: string;
  lessons: number;
  quizzes: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
}

const topics: Topic[] = [
  {
    id: "climate-change",
    title: "Climate Change",
    description: "Understand the science behind global warming, its impacts, and solutions for a sustainable future.",
    image: climateImage,
    lessons: 8,
    quizzes: 5,
    difficulty: "Intermediate",
    duration: "4 hours"
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy",
    description: "Explore solar, wind, and other clean energy technologies transforming our world.",
    image: renewableImage,
    lessons: 6,
    quizzes: 4,
    difficulty: "Beginner",
    duration: "3 hours"
  },
  {
    id: "waste-management",
    title: "Waste Management",
    description: "Learn effective strategies for reducing, reusing, and recycling to minimize environmental impact.",
    image: wasteImage,
    lessons: 5,
    quizzes: 3,
    difficulty: "Beginner",
    duration: "2.5 hours"
  }
];

const getDifficultyColor = (difficulty: Topic["difficulty"]) => {
  switch (difficulty) {
    case "Beginner": return "bg-green-700/30 text-green-400";
    case "Intermediate": return "bg-blue-700/30 text-blue-400";
    case "Advanced": return "bg-red-700/30 text-red-400";
  }
};

export const TopicsGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
            <span className="text-white">Master </span>
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Environmental
            </span>
            <span className="text-white"> Topics</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Dive deep into critical environmental issues with our interactive, multimedia-rich learning experiences designed for the modern student.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <Card
              key={topic.id}
              className="group bg-gray-800 border border-gray-700 hover:border-blue-500 transition-all duration-500 hover:shadow-xl overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={topic.image}
                  alt={`${topic.title} educational content`}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 rounded-t-lg" />
                <Badge
                  className={`absolute top-4 right-4 ${getDifficultyColor(topic.difficulty)} border-0 font-semibold`}
                >
                  {topic.difficulty}
                </Badge>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {topic.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {topic.description}
                </p>

                <div className="flex justify-between text-sm text-gray-400">
                  <span>{topic.lessons} lessons</span>
                  <span>{topic.quizzes} quizzes</span>
                  <span>{topic.duration}</span>
                </div>

                <Button
                  variant="outline"
                  className="w-full text-white border-gray-500 hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300"
                  onClick={() => navigate(`/courses/${topic.id}`)} // Navigate to Learning Page for the topic
                >
                  Start Learning
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
