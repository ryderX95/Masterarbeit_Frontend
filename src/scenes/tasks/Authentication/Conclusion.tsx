import { useState, useEffect } from "react";
import { fetchProgress } from "@/api/fetchProgress";

type Props = {
  userId: string;
};

const Conclusion = ({ userId }: Props) => {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchProgress(userId).then((progress) => {
      if (progress["Conclusion"]?.completed) {
        setCompleted(true);
      }
    });
  }, [userId]);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-md">
      <h2 className="text-2xl font-bold mb-4">Conclusion</h2>

      <p className="mb-4">
        In this module, we explored common vulnerabilities in authentication mechanisms that can lead to serious security breaches. We examined how verbose error messages can reveal user validity, how token-based password resets can be exploited, and how weak input validation opens the door to brute-force attacks.
      </p>

      <h3 className="text-xl font-semibold mb-2">Key Takeaways</h3>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Verbose Errors:</strong> Login and reset forms must avoid revealing whether a user exists to prevent enumeration.
        </li>
        <li>
          <strong>Predictable Tokens:</strong> Reset tokens should be long, random, and expire quickly to avoid brute-force attacks.
        </li>
        <li>
          <strong>Scoped Brute-Force Protection:</strong> Lockouts and rate limiting should apply at both account and IP levels.
        </li>
        <li>
          <strong>Security by Design:</strong> Authentication workflows must be reviewed with security in mind—not just usability.
        </li>
      </ul>

      <p className="text-green-400 font-bold">✅ No answer needed. You’ve completed this section!</p>

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
