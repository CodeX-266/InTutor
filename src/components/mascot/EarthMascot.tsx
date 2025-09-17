import { motion } from "framer-motion";

interface EarthMascotProps {
  size?: "sm" | "md" | "lg";
  animation?: "wave" | "bounce" | "celebrate";
}

export const EarthMascot = ({ size = "md", animation = "wave" }: EarthMascotProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  };

  const animations = {
    wave: {
      rotate: [-10, 10, -10],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1] as const
      }
    },
    bounce: {
      y: [0, -20, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1] as const
      }
    },
    celebrate: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1] as const
      }
    }
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} relative flex items-center justify-center`}
      animate={animations[animation]}
    >
      <div className="relative w-full h-full">
        {/* Earth Body */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg relative overflow-hidden">
          {/* Continents */}
          <div className="absolute top-2 left-2 w-4 h-3 bg-success rounded-full opacity-70"></div>
          <div className="absolute bottom-3 right-3 w-3 h-4 bg-success rounded-full opacity-70"></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-success rounded-full opacity-70"></div>
          
          {/* Eyes */}
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full">
            <div className="w-1 h-1 bg-black rounded-full mt-0.5 ml-0.5"></div>
          </div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full">
            <div className="w-1 h-1 bg-black rounded-full mt-0.5 ml-0.5"></div>
          </div>
          
          {/* Smile */}
          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-white rounded-full"></div>
        </div>
        
        {/* Sparkles */}
        <motion.div
          className="absolute -top-1 -right-1 text-accent text-lg"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1] as const
          }}
        >
          ✨
        </motion.div>
      </div>
    </motion.div>
  );
};