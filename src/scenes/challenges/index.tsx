import Navbar from "@/scenes/navbar";
import Header from "@/scenes/header";
import TaskAccordion from "@/scenes"; // ✅ Correct import
import Footer from "@/scenes/footer";
import Chatbot from "@/scenes/chatbot"; 
import { tasks } from "@/data/tasks"; 
import Leaderboard from "./scenes/leaderboard";

const Challenges = () => {
  // ✅ Mock userId (Replace this with actual user authentication logic)
  const userId = "user-123"; 

  return (
    <div className="bg-gray-800 text-text min-h-screen flex flex-col">
      <Navbar />
      
      {/* Full-width Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full px-6 mt-6">
        
        {/* Left Section - Tasks */}
        <div className="w-full md:w-3/4 pr-6">
          <TaskAccordion userId={userId} tasks={tasks} /> {/* ✅ Corrected props */}
        </div>

        {/* Right Section - Chatbot (now overlaps the header) */}
        <div className="w-full md:w-1/4 relative">
          <Chatbot /> {/* This will now display the chatbot */}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Challenges;
