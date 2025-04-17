import { useState, useEffect } from "react";
import { fetchProgress, submitAnswer } from "@/api/fetchProgress";

// ✅ Props typing
type Props = {
  userId: string;
};

const AuthenticationEnumeration = ({ userId }: Props) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-blue-500 hover:bg-blue-700");

  useEffect(() => {
    fetchProgress(userId).then((progress) => {
      if (progress["AuthenticationEnumeration"]?.completed) {
        setCompleted(true);
        setButtonColor("bg-green-500");
      }
    });
  }, [userId]);

  const handleSubmit = async () => {
    const result = await submitAnswer(userId, "AuthenticationEnumeration", answer);
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
      <h2 className="text-2xl font-bold mb-4">Authentication Enumeration</h2>

      <p className="mb-4">
        Think of yourself as a digital detective. Authentication enumeration isn't just about guessing—it's
        about observing and interpreting responses to uncover hidden user data and vulnerabilities.
      </p>

      <p className="mb-4">
        When systems leak information through inconsistent error messages or reset flows, they unknowingly
        provide attackers with everything they need to identify valid usernames.
      </p>

      <h3 className="text-xl font-semibold mb-2">Identifying Valid Usernames</h3>
      <p className="mb-4">
        For example, error messages that say{" "}
        <span className="text-red-400">"this account doesn't exist"</span> versus{" "}
        <span className="text-red-400">"incorrect password"</span> reveal whether a username is valid—even if
        the password is not.
      </p>

      <h3 className="text-xl font-semibold mb-2">Password Policies</h3>
      <p className="mb-4">
        Systems that return verbose errors about password complexity give attackers more ammo for building
        tailored brute-force lists.
      </p>

      <div className="bg-gray-800 p-4 rounded-md mb-4">
        <pre className="text-green-300 text-sm overflow-x-auto">
          {`<?php
$password = $_POST['pass'];
$pattern = '/^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).+$/';

if (preg_match($pattern, $password)) {
    echo "Password is valid.";
} else {
    echo "Password is invalid. It must contain at least one uppercase letter, one number, and one symbol.";
}
?>`}
        </pre>
      </div>

      <p className="mb-4">
        This kind of message gives an attacker insight into what format to use when creating a brute-force
        list.
      </p>

      <h3 className="text-xl font-semibold mb-2">Common Places to Enumerate</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          <strong>Registration Pages:</strong> Reveal if a username/email is already registered.
        </li>
        <li>
          <strong>Password Reset Forms:</strong> Leak existence of usernames via error content.
        </li>
        <li>
          <strong>Login Pages:</strong> Different error messages hint at valid/invalid usernames.
        </li>
        <li>
          <strong>Data Breaches:</strong> Leaked usernames often reused elsewhere.
        </li>
      </ul>

      {/* Question Section */}
      <h3 className="text-xl font-semibold mb-2">Answer the Question</h3>
      <p className="mb-4">
        What type of error messages can help an attacker identify valid usernames?
      </p>

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

export default AuthenticationEnumeration;
