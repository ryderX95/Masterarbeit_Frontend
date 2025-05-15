import { useState, useEffect } from "react";
import { fetchProgress, submitAnswer } from "@/api/fetchProgress";
import ForgotPassword from "@/assets/ForgotPassword.png";
import ForgotPassword2 from "@/assets/ForgotPassword2.png";
import ForgotPasswordSent from "@/assets/ForgotPasswordSent.png";
import ResetLink from "@/assets/Burp-Reset-Link.png";
import Crunch from "@/assets/Crunch.png";
import TargetScope from "@/assets/burp-target-scope.png";
import ResetToken from "@/assets/Burp-Reset-Token.png";
import IntruderResetToken from "@/assets/burp-intruder-reset-token.png";
import BurpCrunchDictionary from "@/assets/Burp-Crunch-Dictionary.png";
import BurpIntruderAttack from "@/assets/Burp-Intruder-Success.png";
import Flag1 from "@/assets/vwa_flag1.png";

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
        Password reset functionality is vital for user accessibility, but without proper safeguards,
        it can introduce critical security weaknesses. If this process is implemented poorly,
        malicious actors can leverage it to hijack user accounts.
      </p>

      <h3 className="text-xl font-semibold mb-2">Common Reset Techniques</h3>
      <p className="mb-2">
        Web applications typically use one of several methods to verify user identity during a reset:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          <strong>Email Link:</strong> The system sends a reset URL or token to the user's registered email.
          This relies entirely on email account security and the confidentiality of the token.
        </li>
        <li>
          <strong>Security Questions:</strong> The user must answer personal questions. While this adds a layer of
          identity verification, weak or guessable questions severely reduce its effectiveness.
        </li>
        <li>
          <strong>SMS Codes:</strong> A temporary code is delivered via text. This assumes secure access to
          the phone but is vulnerable to SIM-swapping or mobile interception attacks.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Notable Weaknesses</h3>
      <p className="mb-4">Each of these methods has its vulnerabilities:</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          <strong>Predictable Tokens:</strong> If tokens are short, numeric, or follow a pattern,
          an attacker could guess them through brute-force techniques.
        </li>
        <li>
          <strong>Token Lifetime:</strong> Tokens that stay valid for too long give attackers more time to exploit them.
          They should expire quickly or be single-use.
        </li>
        <li>
          <strong>Weak Validation:</strong> Inadequate user identity checks, such as easily guessed security questions,
          allow resets without proper authorization.
        </li>
        <li>
          <strong>Information Leakage:</strong> When reset forms return different error messages depending on whether
          an email is valid or not, attackers can enumerate users.
        </li>
        <li>
          <strong>Unencrypted Delivery:</strong> Reset tokens or URLs sent via non-HTTPS channels can be intercepted by attackers
          monitoring the network.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Real-World Example: Predictable Token Exploitation</h3>
      <p className="mb-4">
        In the demonstration lab, the reset token is generated using a basic random number between 100 and 200:
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
        Because this token is both short and numeric, it becomes practical for an attacker to generate all possible values
        and try them against the reset endpoint.
      </p>

      <h3 className="text-xl font-semibold mb-2">Performing the Attack</h3>
      <ol className="list-decimal pl-6 space-y-2 mb-4">
        <li>Visit the reset page at <code>http://127.0.0.1:3000/reset</code>.</li>
        <img src={ForgotPassword} alt="Forgot Password" className="rounded shadow-md mb-6" />

        <li>Press on "Forgot Password" and submit a request for <code>admin@admin.com</code>.</li>
        <img src={ForgotPassword2} alt="Forgot Password" className="rounded shadow-md mb-6" />

        <p className="mb-4">The web app will respond with a success message:</p>
        <img src={ForgotPasswordSent} alt="Forgot Password" className="rounded shadow-md mb-6" />

        <li>Capture the generated request using Burp Suite.</li>

        <p className="mb-4">
          Scenario: You forgot the password to your user profile and you triggered the "forgot password" option. You observed
          that your reset token was 561 as shown in the reset link provided "http://localhost:5000/reset-password?token=561".
          You get curious and decide to try to guess the token. For demonstration purposes the web application uses the reset
          link with the following format and a numeric token length of three digits: http://localhost:5000/reset-password?token=
        </p>
        <img src={ResetLink} alt="Reset Link" className="rounded shadow-md mb-6" />
        <p>
          Generate a dictionary of numbers from 100 to 200 and save it as opt.txt:
        </p>
        <img src={Crunch} alt="Crunch Token Generation" className="rounded shadow-md mb-6" />

        <p>
          Add http://127.0.0.1:3000/ and http://localhost:5000/ to the scope in Burp Suite.
        </p>
        <img src={TargetScope} alt="Target Scope" className="rounded shadow-md mb-6" />
        <img src={ResetToken} alt="Reset Token" className="rounded shadow-md mb-6" />

        <li>Send the request to Intruder and mark the token field as the payload position.</li>
        <img src={IntruderResetToken} alt="Intruder Token" className="rounded shadow-md mb-6" />

        <li>
          Load the generated dictionary by crunch and start the attack.
          <img src={BurpCrunchDictionary} alt="Crunch Dictionary" className="rounded shadow-md mb-6" />
        </li>

        <li>
          Observe the length of the returned content. Look for a different length entry:
          <img src={BurpIntruderAttack} alt="Intruder Attack" className="rounded shadow-md mb-6" />
        </li>
      </ol>

      <h3 className="text-xl font-semibold mb-2">Final Step</h3>
      <p>
        Login to the application using the new password. If successful, the application will reveal a flag.
        <img src={Flag1} alt="Flag 1" className="rounded shadow-md mb-6" />
      </p>

      <p>
        For demonstration purposes, the token is only a 3-digit numeric value, in this case "123". In real life applications
        these tokens are mostly a numeric value of 6 digits.
      </p>

      <h3 className="text-xl font-semibold mb-2">Answer the Question</h3>
      <p className="mb-4">What flag is shown after resetting the password for the admin user?</p>

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
