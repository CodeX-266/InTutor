import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary greenhouse gas responsible for climate change?",
    options: [
      "Oxygen (O₂)",
      "Carbon Dioxide (CO₂)",
      "Nitrogen (N₂)",
      "Argon (Ar)"
    ],
    correct: 1,
    explanation: "Carbon dioxide is the most significant greenhouse gas contributing to climate change, primarily from burning fossil fuels."
  },
  {
    id: 2,
    question: "Which renewable energy source has the fastest growing capacity globally?",
    options: [
      "Wind Energy",
      "Solar Energy", 
      "Hydroelectric",
      "Geothermal"
    ],
    correct: 1,
    explanation: "Solar energy has seen the most rapid growth in installed capacity worldwide due to decreasing costs and technological improvements."
  }
];

export const QuizDemo = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const question = sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

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
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
  };

  const isLastQuestion = currentQuestion === sampleQuestions.length - 1;

  return (
    <section className="py-20 px-6 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
            <span className="text-white">Interactive </span>
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Quiz Experience
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Test your knowledge with engaging quizzes that make learning memorable
          </p>
        </div>

        {/* Quiz Card */}
        <Card className="bg-gray-800 border border-gray-700 shadow-xl p-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2 text-gray-300">
              <span className="text-sm">Question {currentQuestion + 1} of {sampleQuestions.length}</span>
              <Badge variant="outline" className="text-blue-400 border-blue-400/30 font-semibold">
                Score: {score}/{sampleQuestions.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {!isLastQuestion || !showAnswer ? (
            <>
              {/* Question */}
              <div className="mb-8">
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
              </div>

              {/* Explanation */}
              {showAnswer && (
                <div className="mb-8 p-4 bg-gray-700/40 rounded-lg border border-gray-600 animate-fade-in">
                  <h4 className="font-semibold text-blue-400 mb-2">Explanation:</h4>
                  <p className="text-gray-300">{question.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
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
            </>
          ) : (
            /* Quiz Complete */
            <div className="text-center animate-fade-in">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-white mb-4">Quiz Complete! 🎉</h3>
                <div className="text-6xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    {Math.round((score / sampleQuestions.length) * 100)}%
                  </span>
                </div>
                <p className="text-xl text-gray-300">
                  You answered {score} out of {sampleQuestions.length} questions correctly
                </p>
              </div>
              <Button onClick={handleRestart} variant="hero" size="lg" className="bg-green-500 text-white hover:bg-green-400">
                Try Again
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
