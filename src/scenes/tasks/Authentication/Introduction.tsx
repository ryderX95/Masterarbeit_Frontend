import { useEffect, useState } from "react";
import { fetchProgress, submitAnswer } from "@/api/fetchProgress";

type Props = {
  userId: string;
};

const Introduction = ({ userId }: Props) => {
  const [answer, setAnswer] = useState("No answer required!");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-blue-500 hover:bg-blue-700");

  useEffect(() => {
    fetchProgress().then((progress) => {
      if (progress["IntroductionAcknowledged"]?.completed) {
        setCompleted(true);
        setButtonColor("bg-green-500");
      }
    });
  }, [userId]);

  const handleSubmit = async () => {
    const result = await submitAnswer(userId, "IntroductionAcknowledged", answer);
    if (result.correct || result.message === "Answer stored") {
      setCompleted(true);
      setButtonColor("bg-green-500");
      setFeedback(null);
    } else {
      setButtonColor("bg-red-500 hover:bg-red-700");
      setFeedback("❌ Submission failed. Try again.");
      setTimeout(() => setButtonColor("bg-blue-500 hover:bg-blue-700"), 2000);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-md">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Introduction to Authentication Weaknesses</h2>

      {/* Description */}
      <p className="mb-4">
        Authentication is the first line of defense in most web applications — but even here, subtle misconfigurations
        can expose critical flaws...
      </p>

      {/* Objectives */}
      <h3 className="text-xl font-semibold mb-2">What You'll Learn</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Recognize how enumeration flaws leak information about valid users.</li>
        <li>Explore brute-force attack strategies and how enumeration supports them.</li>
        <li>Analyze verbose error messages and how they aid attackers.</li>
        <li>Use real tools like Burp Suite to exploit flawed authentication workflows.</li>
      </ul>

      {/* Provisional Question Section */}
      <h3 className="text-xl font-semibold mb-2">Quick Checkpoint</h3>
      <p className="mb-4">Ready to begin? Press the blue "Start AttackBox" button in the navbar to connect to the virtual machine. Once connected, in the virtual machine, navigate to http://localhost:5901 , where you will find the vulnerable web application we will attack through this room.  </p>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="flex-1 p-2 bg-gray-700 text-white rounded-md border border-gray-600"
        />
        <button
          onClick={handleSubmit}
          disabled={completed}
          className={`p-2 px-4 rounded-md font-bold text-white transition-all ${buttonColor}`}
        >
          Submit
        </button>
      </div>

      {feedback && <p className="mt-2 text-red-400">{feedback}</p>}
      {completed && <p className="mt-4 text-green-400 font-bold">✅ Task Completed!</p>}
    </div>
  );
};

export default Introduction;
