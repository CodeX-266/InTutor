export interface Lesson {
  id: string;
  title: string;
  content: string;
  type?: "text" | "video" | "activity";
  url?: string; // only for video lessons
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  image: string;
  lessons: Lesson[];
  quizzes: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
}

export const topics: Topic[] = [
  {
    id: "climate-change",
    title: "Climate Change",
    description: "Understand the science behind global warming, its impacts, and solutions for a sustainable future.",
    image: "/assets/climate-change.jpg",
    lessons: [
      { id: "1", title: "Introduction to Climate Change", content: "Learn what climate change is and why it matters.", type: "video", url: "https://www.youtube.com/embed/0aZFpI0y6cY" },
      { id: "2", title: "Greenhouse Gases & Effects", content: "Understand CO₂, CH₄, and their impact.", type: "activity" },
      { id: "3", title: "Global Warming Impacts", content: "Explore how climate change affects ecosystems.", type: "text" },
    ],
    quizzes: 2,
    difficulty: "Intermediate",
    duration: "4 hours",
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy",
    description: "Explore solar, wind, and other clean energy technologies.",
    image: "/assets/renewable-energy.jpg",
    lessons: [
      { id: "1", title: "Introduction to Renewable Energy", content: "Learn the basics of renewable energy.", type: "video", url: "https://www.youtube.com/embed/xS2_Tqv0FYg" },
      { id: "2", title: "Solar Power", content: "How solar panels convert sunlight to electricity.", type: "text" },
      { id: "3", title: "Wind Energy", content: "How wind turbines generate electricity.", type: "activity" },
    ],
    quizzes: 1,
    difficulty: "Beginner",
    duration: "3 hours",
  },
  {
    id: "waste-management",
    title: "Waste Management",
    description: "Learn strategies for reducing, reusing, and recycling.",
    image: "/assets/waste-management.jpg",
    lessons: [
      { id: "1", title: "Introduction to Waste Management", content: "Basics of managing waste effectively.", type: "text" },
      { id: "2", title: "Reduce, Reuse, Recycle", content: "Practical tips and strategies.", type: "video", url: "https://www.youtube.com/embed/ZqBjsP1ZbO4" },
    ],
    quizzes: 1,
    difficulty: "Beginner",
    duration: "2.5 hours",
  },
];
