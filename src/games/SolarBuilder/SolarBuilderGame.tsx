import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GridCell {
  id: string;
  x: number;
  y: number;
  hasSolarPanel: boolean;
  sunExposure: number; // 0-100
  isPolluted: boolean;
  energyProduced: number;
}

interface FloatingEnergy {
  id: string;
  energy: number;
  x: number;
  y: number;
}

const SolarBuilderGame = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [totalEnergy, setTotalEnergy] = useState(0);
  const [solarPanelsPlaced, setSolarPanelsPlaced] = useState(0);
  const [floatingEnergy, setFloatingEnergy] = useState<FloatingEnergy[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  // Create 8x6 grid
  const gridSize = { width: 8, height: 6 };
  const [grid, setGrid] = useState<GridCell[]>(() => {
    const cells: GridCell[] = [];
    for (let y = 0; y < gridSize.height; y++) {
      for (let x = 0; x < gridSize.width; x++) {
        // Create realistic sun exposure patterns
        const sunExposure = Math.max(
          20,
          100 - (Math.abs(x - 4) * 10) - (y * 5) + (Math.random() * 30)
        );
        
        // Add some pollution zones
        const isPolluted = Math.random() < 0.15;
        
        cells.push({
          id: `${x}-${y}`,
          x,
          y,
          hasSolarPanel: false,
          sunExposure: Math.min(100, Math.max(10, sunExposure)),
          isPolluted,
          energyProduced: 0
        });
      }
    }
    return cells;
  });

  const addFloatingEnergy = (energy: number, x: number, y: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    setFloatingEnergy(prev => [...prev, { id, energy, x: x * 60 + 30, y: y * 60 + 30 }]);
    
    setTimeout(() => {
      setFloatingEnergy(prev => prev.filter(e => e.id !== id));
    }, 2000);
  };

  const placeSolarPanel = useCallback((cellId: string) => {
    setGrid(prev => prev.map(cell => {
      if (cell.id === cellId && !cell.hasSolarPanel && !cell.isPolluted) {
        const energyProduced = Math.floor(cell.sunExposure / 10);
        const points = energyProduced * 5;
        
        setScore(s => s + points);
        setTotalEnergy(e => e + energyProduced);
        setSolarPanelsPlaced(p => p + 1);
        
        addFloatingEnergy(energyProduced, cell.x, cell.y);
        
        return {
          ...cell,
          hasSolarPanel: true,
          energyProduced
        };
      }
      return cell;
    }));
  }, []);

  const getCellColor = (cell: GridCell) => {
    if (cell.isPolluted) return "bg-gray-800";
    if (cell.hasSolarPanel) return "bg-blue-600";
    
    // Sun exposure gradient
    const intensity = cell.sunExposure / 100;
    if (intensity > 0.8) return "bg-yellow-300";
    if (intensity > 0.6) return "bg-yellow-200";
    if (intensity > 0.4) return "bg-yellow-100";
    return "bg-gray-100";
  };

  const resetGame = () => {
    setScore(0);
    setTotalEnergy(0);
    setSolarPanelsPlaced(0);
    setFloatingEnergy([]);
    setGameStarted(true);
    
    setGrid(prev => prev.map(cell => ({
      ...cell,
      hasSolarPanel: false,
      energyProduced: 0
    })));
  };

  const earnedBadge = totalEnergy >= 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-green-400 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
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
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="font-bold">{totalEnergy} Energy</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-bold">Score: {score}</span>
          </div>
        </div>
      </div>

      {/* Game Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          ☀️ Solar Panel Builder
        </h1>
        <p className="text-white/90">
          Place solar panels in sunny areas to generate clean energy!
        </p>
      </motion.div>

      {/* Game Stats */}
      <div className="flex justify-center mb-6">
        <div className="bg-white/90 rounded-xl p-4 flex space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{solarPanelsPlaced}</div>
            <div className="text-sm text-gray-600">Panels Placed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{totalEnergy}</div>
            <div className="text-sm text-gray-600">Energy Generated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{Math.floor(totalEnergy * 2.5)}</div>
            <div className="text-sm text-gray-600">CO₂ Saved (kg)</div>
          </div>
        </div>
      </div>

      {/* Grid Game Area */}
      <div className="flex justify-center mb-6">
        <div className="relative bg-white/20 p-4 rounded-2xl">
          <div 
            className="grid gap-1 relative"
            style={{ 
              gridTemplateColumns: `repeat(${gridSize.width}, 60px)`,
              gridTemplateRows: `repeat(${gridSize.height}, 60px)`
            }}
          >
            {grid.map(cell => (
              <motion.div
                key={cell.id}
                className={`
                  relative w-full h-full rounded-lg cursor-pointer border-2 border-white/30
                  ${getCellColor(cell)}
                  ${!cell.hasSolarPanel && !cell.isPolluted ? 'hover:ring-2 hover:ring-blue-400' : ''}
                `}
                whileHover={!cell.hasSolarPanel && !cell.isPolluted ? { scale: 1.05 } : {}}
                whileTap={!cell.hasSolarPanel && !cell.isPolluted ? { scale: 0.95 } : {}}
                onClick={() => placeSolarPanel(cell.id)}
              >
                {/* Sun exposure indicator */}
                {!cell.hasSolarPanel && !cell.isPolluted && (
                  <div className="absolute top-1 right-1">
                    <Sun className={`w-3 h-3 ${
                      cell.sunExposure > 80 ? 'text-yellow-600' :
                      cell.sunExposure > 60 ? 'text-yellow-500' :
                      cell.sunExposure > 40 ? 'text-yellow-400' : 'text-gray-400'
                    }`} />
                  </div>
                )}
                
                {/* Solar panel */}
                {cell.hasSolarPanel && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div className="text-2xl">⚡</div>
                  </motion.div>
                )}
                
                {/* Pollution indicator */}
                {cell.isPolluted && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-2xl">☁️</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Floating Energy */}
          <AnimatePresence>
            {floatingEnergy.map(energy => (
              <motion.div
                key={energy.id}
                initial={{ opacity: 1, scale: 0, x: energy.x, y: energy.y }}
                animate={{ 
                  opacity: 0, 
                  scale: 1.5, 
                  y: energy.y - 50 
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="absolute pointer-events-none font-bold text-xl text-yellow-300 z-10"
              >
                +{energy.energy}⚡
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center mb-6">
        <div className="bg-white/90 rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-300 rounded"></div>
            <span>High Sun</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-100 rounded"></div>
            <span>Low Sun</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span>Solar Panel</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-800 rounded"></div>
            <span>Pollution</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!gameStarted && (
          <Button
            onClick={resetGame}
            className="btn-hero"
          >
            🎮 Start Building
          </Button>
        )}
        
        {gameStarted && (
          <Button
            onClick={resetGame}
            className="btn-game"
          >
            🔄 Reset Grid
          </Button>
        )}
      </div>

      {/* Badge Achievement */}
      {earnedBadge && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="bg-white rounded-2xl p-8 text-center max-w-md mx-4"
          >
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold mb-2">Green Engineer!</h3>
            <p className="text-gray-600 mb-4">
              You generated over 100 energy units with clean solar power!
            </p>
            <Button
              onClick={() => setTotalEnergy(99)} // Hide badge
              className="btn-hero"
            >
              Awesome! 🌞
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SolarBuilderGame;