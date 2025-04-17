import { useState, useEffect } from "react";
import { fetchProgress, submitAnswer } from "@/api/fetchProgress";

// ✅ Strongly typed props
type Props = {
  userId: string;
};

const Conclusion = ({ userId }: Props) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-blue-500 hover:bg-blue-700");

  useEffect(() => {
    fetchProgress(userId).then((progress) => {
      if (progress["Conclusion"]?.completed) {
        setCompleted(true);
        setButtonColor("bg-green-500");
      }
    });
  }, [userId]);

  const handleSubmit = async () => {
    const result = await submitAnswer(userId, "Conclusion", answer);
    if (result.correct) {
      setCompleted(true);
      setButtonColor("bg-green-500");
      setFeedback(null);
    } else {
      setButtonColor("bg-red-500 hover:bg-red-700");
      setFeedback("❌ Incorrect answer! Try again.");
      setTimeout(() => setButtonColor("bg-blue-500 hover:bg-blue-700"), 2000);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-md">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">🔚 Conclusion</h2>

      {/* Summary */}
      <p className="mb-4">
        Throughout this training, we've explored various aspects of{" "}
        <strong>enumeration and brute-force attacks</strong>, equipping you with both the{" "}
        <strong>theoretical knowledge</strong> and <strong>practical skills</strong> required for security assessments.
      </p>

      {/* Key Takeaways */}
      <h3 className="text-xl font-semibold mb-2">📌 Key Takeaways</h3>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Effective Enumeration:</strong> Discovering valid users, hidden endpoints, and security misconfigurations is a crucial first step.
        </li>
        <li>
          <strong>Brute Force Efficiency:</strong> Using optimized wordlists, understanding rate-limiting, and detecting lockout mechanisms can improve attack efficiency.
        </li>
        <li>
          <strong>Ethical Responsibility:</strong> Always perform security testing with <strong>explicit permission</strong> to avoid legal and ethical violations.
        </li>
      </ul>

      {/* Question */}
      <h3 className="text-xl font-semibold mb-2">✅ Answer the Question</h3>
      <p className="mb-4">
        Which technique allows attackers to identify valid users based on how login errors differ?
      </p>

      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="flex-1 p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your answer here"
        />
        <button
          onClick={handleSubmit}
          className={`p-2 px-4 rounded-md font-bold text-white transition-all ${buttonColor}`}
        >
          Submit
        </button>
      </div>

      {feedback && <p className="text-red-400">{feedback}</p>}
      {completed && <p className="text-green-400 font-bold">✅ Task Completed!</p>}

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          onClick={() => console.log("Submitting Report...")}
        >
          Submit Report
        </button>

        <button
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          onClick={() => console.log("Restarting Training...")}
        >
          Restart Training
        </button>
      </div>
    </div>
  );
};

export default Conclusion;
