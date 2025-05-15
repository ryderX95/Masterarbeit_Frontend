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
    fetchProgress(userId).then((progress) => {
      if (progress["InjectionIntroduction"]?.completed) {
        setCompleted(true);
        setButtonColor("bg-green-500");
      }
    });
  }, [userId]);

  const handleSubmit = async () => {
    const result = await submitAnswer(userId, "InjectionIntroduction", answer);
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
      <h2 className="text-2xl font-bold mb-4">Introduction to Injection Attacks</h2>

      {/* Description */}
      <p className="mb-4">
        Injection vulnerabilities occur when untrusted input is sent to an interpreter as part of a command or query.
        The attacker's hostile data tricks the interpreter into executing unintended commands or accessing unauthorized data.
      </p>

      <p className="mb-4">
        This category includes SQL, Command, and LDAP injection attacks. When input isn’t properly validated,
        it can manipulate logic and give attackers full control over databases, filesystems, or even entire systems.
      </p>

      <p className="mb-4">
        Injection was ranked <strong>#3 in the OWASP Top 10 - 2021</strong> list of the most critical web application vulnerabilities.
        Despite its age, it remains one of the most impactful and commonly found issues in real-world apps.
      </p>

      {/* Learning Objectives */}
      <h3 className="text-xl font-semibold mb-2">What You'll Learn</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Understand the different types of injection (SQL, command, LDAP, etc.).</li>
        <li>Explore how poor input handling leads to critical security risks.</li>
        <li>Learn how to identify vulnerable endpoints in Flask applications.</li>
        <li>Review best practices for securing queries and system calls.</li>
      </ul>

      {/* Quick Checkpoint */}
      <h3 className="text-xl font-semibold mb-2">Quick Checkpoint</h3>
      <p className="mb-4">Ready to begin? Just confirm you’ve read the introduction.</p>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="flex-1 p-2 bg-gray-700 text-white rounded-md border border-gray-600 cursor-default"
          readOnly
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
