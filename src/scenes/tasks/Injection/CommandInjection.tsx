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
    fetchProgress(userId).then((progress) => {
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
      setFeedback("❌ Incorrect answer! Try again.");
      setTimeout(() => setButtonColor("bg-blue-500 hover:bg-blue-700"), 2000);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-md">
      <h2 className="text-2xl font-bold mb-4">Command Injection</h2>

      <p className="mb-4">
        Command Injection occurs when user input is insecurely passed into a system shell or command interpreter.
        This allows attackers to execute arbitrary system commands.
      </p>

      <h3 className="text-xl font-semibold mb-2">Common Vulnerable Scenarios:</h3>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Search forms that call shell utilities</li>
        <li>File upload or deletion tools on the server</li>
        <li>Any unfiltered input going into a system command like <code>ping</code>, <code>ls</code>, or <code>cat</code></li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Test Payloads:</h3>
      <div className="bg-gray-800 p-4 mb-4 rounded-md text-green-300 text-sm overflow-x-auto">
        <pre>
{`127.0.0.1; ls
127.0.0.1 && whoami
127.0.0.1 | cat /etc/passwd
`}
        </pre>
      </div>

      <p className="mb-4">
        These payloads attempt to chain additional system commands using shell operators like <code>;</code>, <code>&&</code>, or <code>|</code>.
      </p>

      <h3 className="text-xl font-semibold mb-2">Answer the Question</h3>
      <p className="mb-4">What is the name of the file in the <code>/root</code> directory that contains the flag?</p>

      <div className="flex items-center space-x-2">
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

      {feedback && <p className="mt-2 text-red-400">{feedback}</p>}
      {completed && <p className="mt-4 text-green-400 font-bold">✅ Task Completed!</p>}
    </div>
  );
};

export default CommandInjection;
