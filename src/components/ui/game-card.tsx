import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface GameCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  onPlay: () => void;
  isLocked?: boolean;
}

export const GameCard = ({
  title,
  description,
  icon,
  difficulty,
  points,
  onPlay,
  isLocked = false
}: GameCardProps) => {
  const difficultyColors = {
    Easy: "text-success",
    Medium: "text-warning",
    Hard: "text-destructive"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`game-card ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={() => !isLocked && onPlay()}
    >
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="text-6xl">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-center mb-2 text-foreground">
          {title}
        </h3>

        {/* Description */}
        <p className="text-center text-muted-foreground mb-4 flex-grow">
          {description}
        </p>

        {/* Difficulty & Points */}
        <div className="flex justify-between items-center mb-4">
          <span className={`font-semibold ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
          <span className="text-foreground font-bold">
            +{points} pts
          </span>
        </div>

        {/* Play Button */}
        <Button
          className="btn-game w-full"
          disabled={isLocked}
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
        >
          {isLocked ? "🔒 Locked" : "🎮 Play Now"}
        </Button>
      </div>
    </motion.div>
  );
};