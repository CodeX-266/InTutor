import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TrashItem {
  id: string;
  type: "plastic" | "paper" | "metal" | "organic";
  emoji: string;
  name: string;
  x: number;
  y: number;
  speed: number;
}

interface FloatingPoints {
  id: string;
  points: number;
  x: number;
  y: number;
}

const TrashCollectorGame = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameRunning, setGameRunning] = useState(false);
  const [trashItems, setTrashItems] = useState<TrashItem[]>([]);
  const [floatingPoints, setFloatingPoints] = useState<FloatingPoints[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const trashTypes = {
    plastic: { emoji: "🥤", name: "Plastic Bottle", bin: "plastic" },
    paper: { emoji: "📄", name: "Paper", bin: "paper" },
    metal: { emoji: "🥫", name: "Metal Can", bin: "metal" },
    organic: { emoji: "🍌", name: "Banana Peel", bin: "organic" },
  };

  const bins = [
    { id: "plastic", name: "Plastic", emoji: "🟡", color: "bg-yellow-500" },
    { id: "paper", name: "Paper", emoji: "🔵", color: "bg-blue-500" },
    { id: "metal", name: "Metal", emoji: "⚫", color: "bg-gray-500" },
    { id: "organic", name: "Organic", emoji: "🟫", color: "bg-amber-700" },
  ];

  const generateTrashItem = useCallback((): TrashItem => {
    const types = Object.keys(trashTypes) as (keyof typeof trashTypes)[];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const trashData = trashTypes[randomType];

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: randomType,
      emoji: trashData.emoji,
      name: trashData.name,
      x: Math.random() * (window.innerWidth - 100),
      y: -50,
      speed: 2 + Math.random() * 1.5, // smoother falling
    };
  }, []);

  const addFloatingPoints = (points: number, x: number, y: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    setFloatingPoints((prev) => [...prev, { id, points, x, y }]);

    setTimeout(() => {
      setFloatingPoints((prev) => prev.filter((p) => p.id !== id));
    }, 1500);
  };

  const handleTrashDrop = (trash: TrashItem, binId: string) => {
    const correctBin = trashTypes[trash.type].bin === binId;

    if (correctBin) {
      setScore((prev) => prev + 10);
      addFloatingPoints(10, trash.x, trash.y);
    } else {
      setLives((prev) => prev - 1);
    }

    setTrashItems((prev) => prev.filter((item) => item.id !== trash.id));
  };

  const startGame = () => {
    setGameRunning(true);
    setScore(0);
    setLives(3);
    setTrashItems([]);
    setFloatingPoints([]);
  };

  const endGame = () => {
    setGameRunning(false);
    setTrashItems([]);
  };

  // Game loop
  useEffect(() => {
    if (!gameRunning) return;

    const gameInterval = setInterval(() => {
      // Spawn trash less frequently
      if (Math.random() < 0.15) {
        setTrashItems((prev) => [...prev, generateTrashItem()]);
      }

      // Move trash items down, skip dragged
      setTrashItems((prev) =>
        prev
          .map((item) =>
            item.id === draggingId ? item : { ...item, y: item.y + item.speed }
          )
          .filter((item) => {
            if (item.y > window.innerHeight) {
              setLives((lives) => lives - 1);
              return false;
            }
            return true;
          })
      );
    }, 120);

    return () => clearInterval(gameInterval);
  }, [gameRunning, generateTrashItem, draggingId]);

  // Check game over
  useEffect(() => {
    if (lives <= 0 && gameRunning) {
      endGame();
    }
  }, [lives, gameRunning]);

  const showCelebration = score > 0 && score % 100 === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-green-300 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard")}
          className="bg-white/90"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center space-x-6 bg-white/90 px-4 py-2 rounded-full">
          <div className="flex items-center space-x-1">
            <span className="font-bold">Score: {score}</span>
          </div>
          <div className="flex items-center space-x-1">
            {Array.from({ length: 3 }, (_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 ${i < lives ? "text-red-500 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="pt-20 h-screen relative">
        {/* Falling Trash Items */}
        <AnimatePresence>
          {trashItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: 1,
                rotate: 360,
                x: item.x,
                y: item.y,
              }}
              exit={{ scale: 0, opacity: 0 }}
              drag
              dragMomentum={false} // disable momentum
              onDragStart={() => setDraggingId(item.id)}
              onDragEnd={(_, info) => {
                setDraggingId(null);
                let droppedBin: string | null = null;
                bins.forEach((bin) => {
                  const el = document.querySelector(`[data-bin-id="${bin.id}"]`);
                  if (!el) return;
                  const rect = el.getBoundingClientRect();
                  if (
                    info.point.x >= rect.left &&
                    info.point.x <= rect.right &&
                    info.point.y >= rect.top &&
                    info.point.y <= rect.bottom
                  ) {
                    droppedBin = bin.id;
                  }
                });
                if (droppedBin) handleTrashDrop(item, droppedBin);
              }}
              className="absolute cursor-grab active:cursor-grabbing z-10"
              whileHover={{ scale: 1.1 }}
              whileDrag={{ scale: 1.2, zIndex: 50 }}
            >
              <div className="text-4xl select-none">{item.emoji}</div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Floating Points */}
        <AnimatePresence>
          {floatingPoints.map((points) => (
            <motion.div
              key={points.id}
              initial={{ opacity: 1, y: points.y, x: points.x, scale: 0 }}
              animate={{ opacity: 0, y: points.y - 100, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute z-20 pointer-events-none font-bold text-2xl text-success"
            >
              +{points.points}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Bins */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="flex justify-center space-x-4 px-4">
            {bins.map((bin) => (
              <motion.div
                key={bin.id}
                data-bin-id={bin.id}
                className={`w-20 h-24 ${bin.color} rounded-lg flex flex-col items-center justify-center cursor-pointer relative`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl mb-1">{bin.emoji}</div>
                <div className="text-xs text-white font-bold text-center">{bin.name}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Game Controls */}
        {!gameRunning && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-40">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-8 text-center max-w-md mx-4"
            >
              <h2 className="text-3xl font-bold mb-4">🗑️ Trash Collector</h2>
              <p className="text-gray-600 mb-6">
                Drag trash items to the correct bins! Plastic → yellow, Paper → blue, Metal → gray, Organic → brown.
              </p>
              {score > 0 && (
                <div className="mb-4 p-4 bg-success/20 rounded-lg">
                  <p className="font-bold text-success">Final Score: {score} points!</p>
                </div>
              )}
              <Button onClick={startGame} className="btn-hero">
                {score > 0 ? "🔄 Play Again" : "🎮 Start Game"}
              </Button>
            </motion.div>
          </div>
        )}

        {/* Celebration */}
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          >
            <div className="text-6xl">🎉</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrashCollectorGame;
