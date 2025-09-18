import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaPlay, FaQuestionCircle, FaTasks, FaCheckCircle, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Modal from "react-modal";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: "video" | "quiz" | "activity";
  url?: string; // only for videos
}

interface TopicContent {
  lessons: Lesson[];
  quizzes: { id: number; title: string }[];
}

const topicsData: Record<string, TopicContent> = {
  "climate-change": {
    lessons: [
      { id: 1, title: "Introduction to Climate Change", duration: "30 min", type: "video", url: "https://www.youtube.com/embed/Y3gqoDUtmt4"},
      { id: 2, title: "Greenhouse Gases Explained", duration: "45 min", type: "quiz" },
      { id: 3, title: "Global Warming Effects", duration: "40 min", type: "activity" },
      { id: 4, title: "Mitigation Strategies", duration: "35 min", type: "video", url: "https://www.youtube.com/embed/WWYNy7DIBcg"},
    ],
    quizzes: [{ id: 1, title: "Climate Change Basics Quiz" }],
  },
  "renewable-energy": {
    lessons: [
      { id: 1, title: "Introduction to Renewable Energy", duration: "25 min", type: "video", url: "https://www.youtube.com/embed/1kU0A9IPi0U" },
      { id: 2, title: "Solar Energy", duration: "40 min", type: "activity" },
      { id: 3, title: "Wind Energy", duration: "35 min", type: "quiz" },
    ],
    quizzes: [{ id: 1, title: "Renewable Energy Quiz" }],
  },
  "waste-management": {
    lessons: [
      { id: 1, title: "Waste Reduction Strategies", duration: "30 min", type: "video", url: "https://www.youtube.com/embed/8RrWGeZ9S2c" },
      { id: 2, title: "Recycling Techniques", duration: "40 min", type: "activity" },
      { id: 3, title: "Composting", duration: "35 min", type: "quiz" },
    ],
    quizzes: [{ id: 1, title: "Waste Management Quiz" }],
  },
};

Modal.setAppElement("#root"); // for accessibility

export default function LearningPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [lessonsCompleted, setLessonsCompleted] = useState<number[]>([]);
  const [videoLesson, setVideoLesson] = useState<Lesson | null>(null);

  if (!topicId || !topicsData[topicId]) return <div>Topic not found</div>;
  const topic = topicsData[topicId];

  const handleLessonClick = (lesson: Lesson) => {
    if (!lessonsCompleted.includes(lesson.id)) setLessonsCompleted([...lessonsCompleted, lesson.id]);

    if (lesson.type === "quiz") navigate(`/quiz/${topicId}`);
    else if (lesson.type === "video") setVideoLesson(lesson);
    else if (lesson.type === "activity") alert(`Interactive activity: ${lesson.title}`);
  };

  return (
    <section className="py-20 px-6 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            {topicId.replace("-", " ")}
          </span>{" "}
          Lessons & Quizzes
        </h2>

        <div className="grid gap-6">
          {topic.lessons.map((lesson) => (
            <Card key={lesson.id} className="p-6 bg-gray-800 text-white hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{lesson.title}</h3>
                {lessonsCompleted.includes(lesson.id) && <FaCheckCircle className="text-green-400 text-xl" />}
              </div>
              <p className="text-gray-400 mb-4">{lesson.duration}</p>

              <div className="flex justify-between items-center">
                <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white" onClick={() => handleLessonClick(lesson)}>
                  {lesson.type === "video" && <FaPlay />}
                  {lesson.type === "quiz" && <FaQuestionCircle />}
                  {lesson.type === "activity" && <FaTasks />}
                  {lesson.type === "video" ? "Watch Video" : lesson.type === "quiz" ? "Take Quiz" : "Start Activity"}
                </Button>
                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-green-400 transition-all duration-500"
                    style={{ width: lessonsCompleted.includes(lesson.id) ? "100%" : "0%" }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          {topic.quizzes.map((quiz) => (
            <Button key={quiz.id} className="bg-green-500 text-white hover:bg-green-400 mx-2" onClick={() => navigate(`/quiz/${topicId}`)}>
              {quiz.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Modal
        isOpen={!!videoLesson}
        onRequestClose={() => setVideoLesson(null)}
        className="max-w-3xl mx-auto mt-20 bg-gray-900 p-6 rounded-lg outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-50"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{videoLesson?.title}</h3>
          <Button onClick={() => setVideoLesson(null)} className="bg-red-500 text-white hover:bg-red-400">
            <FaTimes />
          </Button>
        </div>
        {videoLesson && (
          <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={videoLesson.url}
              title={videoLesson.title}
              className="absolute top-0 left-0 w-full h-full rounded"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </Modal>
    </section>
  );
}
