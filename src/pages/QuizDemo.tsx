import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Define your quiz questions for each topic
const quizzes: Record<string, any[]> = {
  "climate-change": [
    {
      id: 1,
      question: "What is the primary greenhouse gas responsible for climate change?",
      options: ["Oxygen (O₂)", "Carbon Dioxide (CO₂)", "Nitrogen (N₂)", "Argon (Ar)"],
      correct: 1,
      explanation:
        "Carbon dioxide is the most significant greenhouse gas contributing to climate change, primarily from burning fossil fuels.",
    },
    {
      id: 2,
      question: "Which human activity contributes most to climate change?",
      options: ["Deforestation", "Fishing", "Urban Gardening", "Hiking"],
      correct: 0,
      explanation: "Deforestation releases large amounts of CO₂ and reduces the planet's ability to absorb greenhouse gases.",
    },
  ],
  "renewable-energy": [
    {
      id: 1,
      question: "Which renewable energy source has the fastest growing capacity globally?",
      options: ["Wind Energy", "Solar Energy", "Hydroelectric", "Geothermal"],
      correct: 1,
      explanation:
        "Solar energy has seen the most rapid growth in installed capacity worldwide due to decreasing costs and technological improvements.",
    },
    {
      id: 2,
      question: "Which energy source is considered clean and sustainable?",
      options: ["Coal", "Natural Gas", "Solar", "Oil"],
      correct: 2,
      explanation: "Solar power is clean, renewable, and does not produce greenhouse gas emissions during operation.",
    },
  ],
  "waste-management": [
    {
      id: 1,
      question: "Which of the following is the best example of reducing waste?",
      options: ["Throwing all trash together", "Using reusable bags", "Burning waste", "Ignoring recycling"],
      correct: 1,
      explanation: "Using reusable bags helps reduce single-use plastic waste significantly.",
    },
    {
      id: 2,
      question: "Which practice is part of the 3R principle?",
      options: ["Reduce", "Recycle", "Reuse", "All of the above"],
      correct: 3,
      explanation: "The 3R principle includes Reduce, Reuse, and Recycle.",
    },
  ],
};

export const QuizDemo = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  if (!topicId || !quizzes[topicId]) return <p className="text-white text-center mt-20">No quiz found for this topic.</p>;

  const questions = quizzes[topicId];
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswerSelect = (index: number) => {
    if (showAnswer) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowAnswer(true);
    if (selectedAnswer === question.correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      navigate("/courses"); // Go back to courses after finishing
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
  };

  return (
    <section className="py-20 px-6 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
            <span className="text-white">Quiz: </span>
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              {topicId.replace("-", " ")}
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Test your knowledge on {topicId.replace("-", " ")} with this interactive quiz.
          </p>
        </div>

        <Card className="bg-gray-800 border border-gray-700 shadow-xl p-8">
          {/* Progress */}
          <div className="mb-6 flex justify-between items-center text-gray-300">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <Badge variant="outline" className="text-blue-400 border-blue-400/30 font-semibold">
              Score: {score}/{questions.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2 mb-8" />

          {/* Question */}
          <h3 className="text-2xl font-semibold text-white mb-6">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showAnswer}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                  selectedAnswer === index
                    ? showAnswer
                      ? index === question.correct
                        ? "bg-green-700/20 border-green-400 text-green-400"
                        : "bg-red-700/20 border-red-400 text-red-400"
                      : "bg-blue-700/20 border-blue-400 text-blue-400"
                    : showAnswer && index === question.correct
                    ? "bg-green-700/20 border-green-400 text-green-400"
                    : "bg-gray-900 border-gray-700 hover:border-blue-400 text-white hover:bg-gray-800/50"
                }`}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showAnswer && (
            <div className="mt-6 p-4 bg-gray-700/40 rounded-lg border border-gray-600 animate-fade-in">
              <h4 className="font-semibold text-blue-400 mb-2">Explanation:</h4>
              <p className="text-gray-300">{question.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            {!showAnswer ? (
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                variant="hero"
                className="flex-1 bg-blue-500 text-white hover:bg-blue-400"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={isLastQuestion ? handleRestart : handleNext}
                variant="hero"
                className="flex-1 bg-green-500 text-white hover:bg-green-400"
              >
                {isLastQuestion ? "Restart Quiz" : "Next Question"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default QuizDemo;
