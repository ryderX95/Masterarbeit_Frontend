import { useState, useEffect } from "react";
import { fetchProgress, submitAnswer } from "@/api/fetchProgress";

type Props = {
  userId: string;
};

const CommandInjection = ({ userId }: Props) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-blue-500 hover:bg-blue-700");

  useEffect(() => {
    fetchProgress().then((progress) => {
      if (progress["CommandInjection"]?.completed) {
        setCompleted(true);
        setButtonColor("bg-green-500");
      }
    });
  }, [userId]);

  const handleSubmit = async () => {
    const result = await submitAnswer(userId, "CommandInjection", answer);
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
      <h2 className="text-2xl font-bold mb-4">🧨 Command Injection – Breaking the Shell Barrier</h2>

      <p className="mb-4">
        A diagnostic tool on the vulnerable server lets users ping any hostname by passing it as a query
        parameter. Unfortunately, it directly injects the input into a system shell command without validation.
      </p>

      <p className="mb-4">
        Your mission: inject an additional command to read the contents of <code>/flag.txt</code>.
        If successful, the response will include the flag.
      </p>

      <p className="mb-4">
        Target endpoint: <code>/ping?host=</code><br />
        Try payloads like: <code>127.0.0.1; cat /flag.txt</code>
      </p>

      <h3 className="text-xl font-semibold mb-2">📝 Submit the Flag</h3>

      <p className="mb-4">Flag format: <code>FLAG&#123;...&#125;</code></p>

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

export default CommandInjection;
