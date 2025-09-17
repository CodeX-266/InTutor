import { motion } from "framer-motion";

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  requiredPoints: number;
}

interface BadgeDisplayProps {
  badges: Badge[];
  userPoints: number;
}

export const BadgeDisplay = ({ badges, userPoints }: BadgeDisplayProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-center">🏆 Your Badges</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`
              relative p-4 rounded-xl text-center transition-all duration-300
              ${badge.earned 
                ? 'bg-gradient-to-br from-accent to-warning shadow-lg badge-glow' 
                : 'bg-muted opacity-50'
              }
            `}
          >
            {/* Badge Icon */}
            <div className="text-4xl mb-2">
              {badge.icon}
            </div>
            
            {/* Badge Name */}
            <h4 className="font-bold text-sm mb-1">
              {badge.name}
            </h4>
            
            {/* Progress or Earned Status */}
            {badge.earned ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs text-success font-semibold"
              >
                ✅ Earned!
              </motion.div>
            ) : (
              <div className="text-xs text-muted-foreground">
                {badge.requiredPoints - userPoints > 0 
                  ? `${badge.requiredPoints - userPoints} pts to go`
                  : 'Ready to earn!'
                }
              </div>
            )}
            
            {/* Tooltip Description */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {badge.description}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};