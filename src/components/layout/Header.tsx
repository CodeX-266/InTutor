import { motion } from "framer-motion";
import { Trophy, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userPoints: number;
  userName: string;
}

export const Header = ({ userPoints, userName }: HeaderProps) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-card/90 backdrop-blur-sm border-b border-border p-4 sticky top-0 z-50"
    >
      <div className="container mx-auto flex items-center justify-between">
        <motion.div
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            🌍 EcoEduPlay
          </div>
        </motion.div>

        <div className="flex items-center space-x-6">
          {/* Points Display */}
          <motion.div
            className="flex items-center space-x-2 bg-success/20 px-4 py-2 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Trophy className="w-5 h-5 text-success" />
            <span className="font-bold text-success">{userPoints} pts</span>
          </motion.div>

          {/* User Info */}
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span className="font-medium">{userName}</span>
          </div>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};