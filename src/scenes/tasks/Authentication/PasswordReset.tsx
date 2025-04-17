import { useState, useEffect } from "react";
import { fetchProgress, submitAnswer } from "@/api/fetchProgress";

type Props = {
  userId: string;
};

const PasswordReset = ({ userId }: Props) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-blue-500 hover:bg-blue-700");

  useEffect(() => {
    fetchProgress(userId).then((progress) => {
      if (progress["PasswordReset"]?.completed) {
        setCompleted(true);
        setButtonColor("bg-green-500");
      }
    });
  }, [userId]);

  const handleSubmit = async () => {
    const result = await submitAnswer(userId, "PasswordReset", answer);
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
      <h2 className="text-2xl font-bold mb-4">Password Reset Flow Vulnerabilities</h2>

      <p className="mb-4">
        The password reset mechanism is essential for user convenience, but its security must be carefully implemented.
        A poorly secured password reset process can be exploited by attackers to take over accounts.
      </p>

      <h3 className="text-xl font-semibold mb-2">Common Password Reset Methods</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Email-Based Reset:</strong> A reset link is sent via email, requiring secure token generation.</li>
        <li><strong>Security Question-Based Reset:</strong> Users answer personal questions, but predictable answers can be exploited.</li>
        <li><strong>SMS-Based Reset:</strong> A code is sent via SMS, which can be intercepted via SIM swapping.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Common Exploits & Weaknesses</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Predictable Tokens:</strong> If reset tokens follow a pattern, attackers can brute-force valid reset URLs.</li>
        <li><strong>Token Expiration Issues:</strong> Long-lived tokens provide a wider attack window for exploitation.</li>
        <li><strong>Insufficient Validation:</strong> Weak verification mechanisms allow attackers to reset passwords for other users.</li>
        <li><strong>Information Disclosure:</strong> Error messages revealing whether an email exists help attackers enumerate accounts.</li>
        <li><strong>Insecure Transport:</strong> Reset links sent over HTTP can be intercepted by network eavesdroppers.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Exploiting Predictable Tokens</h3>
      <p className="mb-4">
        Some applications generate easily guessable reset tokens, allowing brute-force attacks. The following code example shows
        a vulnerable password reset function using a <strong>3-digit token</strong>:
      </p>

      <div className="bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
        <pre className="text-green-300 text-sm">
{`$token = mt_rand(100, 200);
$query = $conn->prepare("UPDATE users SET reset_token = ? WHERE email = ?");
$query->bind_param("ss", $token, $email);
$query->execute();`}
        </pre>
      </div>

      <p className="mb-4">
        The above code sets a <strong>3-digit</strong> password reset token (<code>100 - 200</code>). An attacker can
        <strong> brute-force</strong> all possible token values to reset an account.
      </p>

      <h3 className="text-xl font-semibold mb-2">Brute-Force Attack with Burp Suite</h3>
      <ol className="list-decimal pl-6 space-y-2 mb-4">
        <li>Navigate to the application's password reset page.</li>
        <li>Enter <code>admin@admin.com</code> and submit the form.</li>
        <li>Intercept the response with <strong>Burp Suite</strong>.</li>
        <li>Send the reset request to <strong>Burp Intruder</strong> and configure payloads for token brute-forcing.</li>
        <li>Use <strong>Crunch</strong> to generate token guesses (<code>100-200</code>).</li>
      </ol>

      <div className="bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
        <pre className="text-green-300 text-sm">
{`user@tryhackme $ crunch 3 3 -o otp.txt -t %%% -s 100 -e 200
Crunch will now generate the following number of lines: 101
Crunch: 100% completed generating output`}
        </pre>
      </div>

      <p className="mb-4">
        Once the correct token is found, use it to reset the password and take over the account.
      </p>

      <h3 className="text-xl font-semibold mb-2">Answer the Question</h3>
      <p className="mb-4">What is the flag shown after successfully resetting the password for admin?</p>

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

export default PasswordReset;
