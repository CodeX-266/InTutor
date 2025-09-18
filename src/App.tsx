import { FC } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import LearningPage from "./pages/LearningPage";
import QuizDemo from "./pages/QuizDemo";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FriendsPage from "./pages/FriendsPage"; // <-- NEW
import NotFound from "./pages/NotFound";

// Games
import TrashCollectorGame from "./games/TrashCollector/TrashCollectorGame";
import SolarBuilderGame from "./games/SolarBuilder/SolarBuilderGame";
import EcoQuizGame from "./games/EcoQuiz/EcoQuizGame";

const queryClient = new QueryClient();

const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Courses */}
          <Route path="/courses" element={<Courses />} />

          {/* Learning page for selected topic */}
          <Route path="/courses/:topicId" element={<LearningPage />} />

          {/* Quiz page for selected topic */}
          <Route path="/quiz/:topicId" element={<QuizDemo />} />

          {/* About & Contact */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Friends */}
          <Route path="/friends" element={<FriendsPage />} />

          {/* Games */}
          <Route
            path="/games/trash-collector"
            element={<TrashCollectorGame />}
          />
          <Route path="/games/solar-builder" element={<SolarBuilderGame />} />
          <Route path="/games/eco-quiz" element={<EcoQuizGame />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
