import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { EarthMascot } from "@/components/mascot/EarthMascot";
import { ArrowLeft, Mail, Lock, User, School } from "lucide-react";

import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(""); // Track selected role

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
      school: { value: string };
    };

    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;
    const school = target.school?.value || "";

    if (!role) {
      alert("Please select your role");
      return;
    }

    setLoading(true);
    try {
      // Firebase Auth: create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        // Update displayName in Auth
        await updateProfile(userCredential.user, { displayName: name });

        // Save user details in Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          name,
          email,
          role,
          school,
          createdAt: serverTimestamp(),
        });
      }

      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
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
              <EarthMascot size="md" animation="celebrate" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-700">
              Join InTutor!
            </CardTitle>
            <p className="text-muted-foreground">
              Start your journey to becoming an eco-hero
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-green-700 font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    className="pl-10 border-green-200 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-700 font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@school.edu"
                    className="pl-10 border-green-200 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-green-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    className="pl-10 border-green-200 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-green-700 font-medium">
                  I am a...
                </Label>
                <Select defaultValue="" onValueChange={(value) => setRole(value)}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">🎓 Student</SelectItem>
                    <SelectItem value="teacher">👩‍🏫 Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* School */}
              <div className="space-y-2">
                <Label htmlFor="school" className="text-green-700 font-medium">
                  School (Optional)
                </Label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="school"
                    type="text"
                    placeholder="Your school name"
                    className="pl-10 border-green-200 focus:border-green-500"
                  />
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account 🌍"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignupPage;
