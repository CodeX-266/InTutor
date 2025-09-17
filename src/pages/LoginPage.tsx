import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { EarthMascot } from "@/components/mascot/EarthMascot";
import { ArrowLeft, Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to dashboard
    // This will be connected to Supabase authentication
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      {/* Back Button */}
      <Button
        onClick={() => navigate("/")}
        variant="outline"
        className="absolute top-6 left-6 bg-white/20 text-white border-white/30 hover:bg-white/30"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/95 backdrop-blur shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <EarthMascot size="md" animation="wave" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-700">
              Welcome Back!
            </CardTitle>
            <p className="text-muted-foreground">
              Sign in to continue your eco-learning journey
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-700 font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@school.edu"
                    className="pl-10 border-green-200 focus:border-green-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-green-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 border-green-200 focus:border-green-500"
                    required
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
              >
                Sign In 🌱
              </Button>
            </form>
            
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Sign up here
                </button>
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Demo Access:</strong> Click "Sign In" with any email to try the demo!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;