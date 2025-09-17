import { motion } from "framer-motion";
import { Trophy, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  userPoints: number;
  userName: string;
}

export const Header = ({ userPoints, userName }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gray-900/90 backdrop-blur-lg border-b border-gray-800 p-4 sticky top-0 z-50 shadow-xl"
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-4 cursor-pointer"
          whileHover={{ scale: 1.08, textShadow: "0 0 10px rgba(72, 187, 120, 0.7)" }}
          onClick={() => navigate("/")}
        >
          <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent tracking-wide">
            InTutor
          </div>
        </motion.div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Points Display */}
          <motion.div
            className="flex items-center space-x-2 bg-green-900/40 px-4 py-2 rounded-full shadow-md hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <Trophy className="w-5 h-5 text-green-400" />
            <span className="font-semibold text-green-400">{userPoints} pts</span>
          </motion.div>

          {/* User Info */}
          <motion.div
            className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-full shadow-md hover:shadow-lg transition-all cursor-default"
            whileHover={{ scale: 1.03 }}
          >
            <User className="w-5 h-5 text-gray-200" />
            <span className="font-medium text-gray-200">{"Adarsh"}</span>
          </motion.div>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-200 hover:text-green-400 hover:bg-gray-800/50 transition-all rounded-full"
            onClick={() =>
              alert(
                "Settings menu coming soon!"
              )
            }
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};
