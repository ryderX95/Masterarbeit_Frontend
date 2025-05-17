import { useState, useEffect } from "react";
import { fetchProgress, submitAnswer } from "@/api/fetchProgress";

type Props = {
  userId: string;
};

const Conclusion = ({ userId }: Props) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-blue-500 hover:bg-blue-700");

  useEffect(() => {
    fetchProgress().then((progress) => {
      if (progress["InjectionConclusion"]?.completed) {
        setCompleted(true);
        setButtonColor("bg-green-500");
      }
    });
  }, [userId]);

  const handleSubmit = async () => {
    const result = await submitAnswer(userId, "InjectionConclusion", answer);
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
      <h2 className="text-2xl font-bold mb-4">🏁 Injection Room – Conclusion</h2>

      <p className="mb-4">
        Excellent work — you’ve completed the Injection training room! Over the past few tasks, you explored how
        attackers exploit input vulnerabilities to bypass authentication, run system commands, and execute malicious
        scripts in browsers.
      </p>

      <h3 className="text-xl font-semibold mb-2 mt-4">🛡️ Key Takeaways</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Sanitize & validate user input:</strong> Always treat external input as untrusted.</li>
        <li><strong>Use prepared statements (SQL):</strong> Avoid string concatenation in database queries.</li>
        <li><strong>Escape user input in HTML/JS:</strong> Prevent XSS by escaping or sanitizing output.</li>
        <li><strong>Avoid shell command injection:</strong> Use libraries like <code>subprocess.run(..., shell=False)</code>.</li>
        <li><strong>Apply defense-in-depth:</strong> Use WAFs, logging, and minimal privilege everywhere.</li>
      </ul>

      <p className="mb-4">
        Injection attacks are consistently in the <strong>OWASP Top 10</strong> because they're dangerous, common, and often easy to exploit.
        The best defense is strong awareness and secure coding habits.
      </p>

      <h3 className="text-xl font-semibold mb-2">🏆 Final Checkpoint</h3>
      <p className="mb-4">
        After finishing the room, your virtual machine displayed a final flag. Please enter it below to complete this module.
      </p>

      <p className="mb-4">Flag format: <code>FLAG&#123;...&#125;</code></p>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="flex-1 p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the final flag here..."
        />
        <button
          onClick={handleSubmit}
          className={`p-2 px-4 rounded-md font-bold text-white transition-all ${buttonColor}`}
        >
          Submit
        </button>
      </div>

      {feedback && <p className="mt-2 text-red-400">{feedback}</p>}
      {completed && <p className="mt-4 text-green-400 font-bold">✅ Room Complete – You’re an Injection Master!</p>}
    </div>
  );
};

export default Conclusion;
