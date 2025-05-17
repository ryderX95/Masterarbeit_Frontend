import { useState, useEffect } from "react";
import { fetchProgress, submitAnswer } from "@/api/fetchProgress";


type Props = {
  userId: string;
};

const AuthenticationEnumeration = ({ userId }: Props) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-blue-500 hover:bg-blue-700");

  useEffect(() => {
    fetchProgress().then((progress) => {
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
      <h2 className="text-2xl font-bold mb-4">Understanding Authentication Enumeration</h2>

      <p className="mb-4">
      Imagine stepping into the role of a cyber detective—authentication enumeration isn't simply about guesswork. It's about carefully analyzing system behavior to spot clues that reveal user information or weak points in access control.
      </p>

      <p className="mb-4">
        When systems leak information through inconsistent error messages or reset flows, they unknowingly
        provide attackers with everything they need to identify valid usernames.
      </p>

      <h3 className="text-xl font-semibold mb-2">Clues in System Feedback</h3>
      <p className="mb-4">
      Some applications inadvertently disclose whether a username exists based on how they respond to login attempts. For instance, showing different error messages like{" "}
        <span className="text-red-400">"this account doesn't exist"</span> versus{" "}
        <span className="text-red-400">"incorrect password"</span> can inadvertently confirm which usernames are valid.
      </p>

      <h3 className="text-xl font-semibold mb-2">Password Policy Clues

</h3>
      <p className="mb-4">
      Password creation rules often reveal how strong or complex user passwords are expected to be. When an attacker understands these requirements, they can adjust their approach to better align with the system's expected input. For instance, the PHP snippet below uses a regular expression to enforce that passwords must include at least one symbol, a number, and an uppercase letter:      </p>

      <div className="bg-gray-800 p-4 rounded-md mb-4">
        <pre className="text-green-300 text-sm overflow-x-auto">
          {`<?php
$password = $_POST['pass'];
$pattern = '/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/';

if (preg_match($pattern, $password)) {
    echo "Your password meets the requirements.";
} else {
    echo "Password must include at least one uppercase letter, one number, and one special character.";
}
?>
`}
        </pre>
      </div>

      <p className="mb-4">
        This kind of message gives an attacker insight into what format to use when creating a brute-force
        list.
      </p>

      <h3 className="text-xl font-semibold mb-2">Common Places to Enumerate</h3>
<ul className="list-disc pl-6 space-y-4 mb-4">
  <li>
    <strong>Registration Pages: </strong>  
    Modern registration forms often help users by instantly checking whether a username or email is already in use. While this improves usability, it also creates an opportunity for attackers. When the system responds with a message like "This email is already registered," it unintentionally confirms that the account exists. Attackers can automate this process to build lists of valid usernames and email addresses without ever logging in.
  </li>
  <li>
    <strong>Password Reset Forms: </strong>  
    Designed to help users recover access, these forms often behave differently depending on whether the submitted username or email is valid. A generic message like "Check your email for reset instructions" is ideal, but many applications still return responses such as "User not found," which provides confirmation of whether the input exists in the system. This feedback can be exploited to identify active accounts.
  </li>
  <li>
    <strong>Verbose Errors: </strong>  
    Verbose error messages during login attempts are another rich source of information. If an application returns distinct messages like "Username not found" versus "Incorrect password," it reveals which usernames are valid, even without a successful login. This inconsistency is a key method attackers use to enumerate valid users before launching brute-force or credential stuffing attacks.
  </li>
  <li>
    <strong>Data Breaches: </strong>  
    Previously leaked databases give attackers a massive advantage. Usernames, email addresses, and passwords exposed in one breach are often reused across other platforms. Attackers test these credentials in bulk across different sites to find valid matches. Even if passwords are changed, identifying reused usernames still helps narrow the target pool and increase the success rate of further attacks.
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
