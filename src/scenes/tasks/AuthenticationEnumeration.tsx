import { useState, useEffect } from "react";
import { fetchProgress, submitAnswer } from "@/api/fetchProgress";

const AuthenticationEnumeration = ({ userId }: { userId: string }) => {
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState<string | null>(null);
    const [completed, setCompleted] = useState(false);
    const [buttonColor, setButtonColor] = useState("bg-blue-500 hover:bg-blue-700");

    useEffect(() => {
        fetchProgress(userId).then((progress) => {
            if (progress["AuthenticationEnumeration"]?.completed) {
                setCompleted(true);
                setButtonColor("bg-green-500"); // Keep button green if already completed
            }
        });
    }, [userId]);

    const handleSubmit = async () => {
        const result = await submitAnswer(userId, "AuthenticationEnumeration", answer);
        if (result.correct) {
            setCompleted(true);
            setButtonColor("bg-green-500"); // Turn button green
            setFeedback(null);
        } else {
            setButtonColor("bg-red-500 hover:bg-red-700"); // Turn button red
            setFeedback("❌ Incorrect answer! Try again.");
            setTimeout(() => setButtonColor("bg-blue-500 hover:bg-blue-700"), 2000); // Reset to blue after 2s
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white rounded-md">
            {/* Title */}
            <h2 className="text-2xl font-bold mb-4">Authentication Enumeration</h2>

            {/* Description */}
            <p className="mb-4">
                Think of yourself as a digital detective. It's not just about picking up clues—it's about understanding what these clues reveal about the security of a system. 
                This is essentially what authentication enumeration involves. It's like piecing together a puzzle rather than just ticking off items on a checklist.
            </p>

            <p className="mb-4">
                Authentication enumeration is like peeling back the layers of an onion. You remove each layer of a system's security to reveal the real operations underneath. 
                It's not just about routine checks; it's about seeing how everything is connected.
            </p>

            {/* Section: Identifying Valid Usernames */}
            <h3 className="text-xl font-semibold mb-2">Identifying Valid Usernames</h3>
            <p className="mb-4">
                Knowing a valid username lets an attacker focus just on the password. You can figure out usernames in different ways, like observing how the application responds during login or password resets. 
                For example, error messages that specify <span className="text-red-400">"this account doesn't exist"</span> or <span className="text-red-400">"incorrect password"</span> can hint at valid usernames, making an attacker's job easier.
            </p>

            {/* Section: Password Policies */}
            <h3 className="text-xl font-semibold mb-2">Password Policies</h3>
            <p className="mb-4">
                The guidelines when creating passwords can provide valuable insights into the complexity of the passwords used in an application. 
                By understanding these policies, an attacker can gauge the potential complexity of the passwords and tailor their strategy accordingly.
            </p>

            {/* Code Block */}
            <div className="bg-gray-800 p-4 rounded-md mb-4">
                <pre className="text-green-300 text-sm overflow-x-auto">
                    {`<?php
$password = $_POST['pass']; // Example1
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
                In the above example, if the supplied password doesn't satisfy the policy defined in the pattern variable, the application will return an error message revealing the regex code requirement. 
                An attacker might generate a dictionary that satisfies this policy.
            </p>

            {/* Section: Common Places to Enumerate */}
            <h3 className="text-xl font-semibold mb-2">Common Places to Enumerate</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                    <strong>Registration Pages:</strong> Attackers exploit the feedback about whether a username or email is already taken to compile a list of active users.
                </li>
                <li>
                    <strong>Password Reset Features:</strong> Applications may unintentionally confirm whether a username exists through different error messages.
                </li>
                <li>
                    <strong>Verbose Errors:</strong> Differentiating between "username not found" and "incorrect password" can help attackers identify valid usernames.
                </li>
                <li>
                    <strong>Data Breach Information:</strong> Attackers test usernames from previous breaches, hoping users reuse credentials across different platforms.
                </li>
            </ul>

            {/* Task Completion Section */}
            <h3 className="text-xl font-semibold mb-2">Answer the Question</h3>
            <p className="mb-4">What type of error messages can help an attacker identify valid usernames?</p>

            {/* Input & Button (Aligned) */}
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

            {/* Feedback Message */}
            {feedback && <p className="mt-2 text-red-400">{feedback}</p>}

            {/* Success Message */}
            {completed && <p className="mt-4 text-green-400 font-bold">✅ Task Completed!</p>}
        </div>
    );
};

export default AuthenticationEnumeration;
