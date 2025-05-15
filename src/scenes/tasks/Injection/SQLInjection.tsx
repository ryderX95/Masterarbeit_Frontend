import { useState, useEffect } from "react";
import { fetchProgress, submitAnswer } from "@/api/fetchProgress";

type Props = {
  userId: string;
};

const SQLInjection = ({ userId }: Props) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-blue-500 hover:bg-blue-700");

  useEffect(() => {
    fetchProgress(userId).then((progress) => {
      if (progress["SQLiLoginBypass"]?.completed) {
        setCompleted(true);
        setButtonColor("bg-green-500");
      }
    });
  }, [userId]);

  const handleSubmit = async () => {
    const result = await submitAnswer(userId, "SQLiLoginBypass", answer);
    if (result.correct) {
      setCompleted(true);
      setButtonColor("bg-green-500");
      setFeedback(null);
    } else {
      setButtonColor("bg-red-500 hover:bg-red-700");
      setFeedback("❌ Incorrect flag. Try again.");
      setTimeout(() => setButtonColor("bg-blue-500 hover:bg-blue-700"), 2000);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-md">
      <h2 className="text-2xl font-bold mb-4">🧨 SQL Injection – Login Bypass</h2>

      <p className="mb-4">
        The login form on the vulnerable web application hosted in your virtual machine is insecure.
        It fails to sanitize user input and builds SQL queries dynamically, making it vulnerable to SQL Injection.
      </p>

      <p className="mb-4">
        Your goal is to craft an input payload that allows you to bypass the authentication and log in
        without valid credentials. After a successful login, a flag will be shown on the page.
      </p>

      <p className="mb-4">
        🔎 Format: <code>FLAG&#123;...&#125;</code>
      </p>

      <h3 className="text-xl font-semibold mb-2">📝 Submit Your Flag</h3>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="flex-1 p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the flag here..."
        />
        <button
          onClick={handleSubmit}
          className={`p-2 px-4 rounded-md font-bold text-white transition-all ${buttonColor}`}
        >
          Submit
        </button>
      </div>

      {feedback && <p className="mt-2 text-red-400">{feedback}</p>}
      {completed && <p className="mt-4 text-green-400 font-bold">✅ Flag Accepted – Task Complete!</p>}
    </div>
  );
};

export default SQLInjection;
