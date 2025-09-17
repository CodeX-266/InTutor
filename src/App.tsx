import { FC } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses"; // <-- Add your Courses page here
import TrashCollectorGame from "./games/TrashCollector/TrashCollectorGame";
import SolarBuilderGame from "./games/SolarBuilder/SolarBuilderGame";
import EcoQuizGame from "./games/EcoQuiz/EcoQuizGame";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page with navbar included */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Courses */}
          <Route path="/courses" element={<Courses />} /> {/* <-- New route */}

          {/* Games */}
          <Route path="/games/trash-collector" element={<TrashCollectorGame />} />
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
