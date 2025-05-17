import { useState, useEffect } from "react";
import { fetchProgress, submitAnswer } from "@/api/fetchProgress";

type Props = {
  userId: string;
};

const XSS = ({ userId }: Props) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-blue-500 hover:bg-blue-700");

  useEffect(() => {
    fetchProgress().then((progress) => {
      if (progress["BasicXSS"]?.completed) {
        setCompleted(true);
        setButtonColor("bg-green-500");
      }
    });
  }, [userId]);

  const handleSubmit = async () => {
    const result = await submitAnswer(userId, "BasicXSS", answer);
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
      <h2 className="text-2xl font-bold mb-4">🧠 XSS – Your Script, Their Browser</h2>

      <p className="mb-4">
        The comment feature on the vulnerable app doesn’t escape or filter user input. This lets attackers inject scripts
        that run in other users’ browsers — also known as Cross-Site Scripting (XSS).
      </p>

      <p className="mb-4">
        Your goal is to inject a JavaScript payload that executes in the browser and reveals the flag.
        This might be something as simple as using <code>document.write</code> or <code>alert</code>.
      </p>

      <p className="mb-4">
        Once the script is executed in the browser, the flag will be displayed:
        <br /><code>FLAG&#123;basic-xss-success&#125;</code>
      </p>

      <h3 className="text-xl font-semibold mb-2">📝 Submit the Flag</h3>
      <p className="mb-4">Enter the flag you received after your script executed.</p>

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

export default XSS;
