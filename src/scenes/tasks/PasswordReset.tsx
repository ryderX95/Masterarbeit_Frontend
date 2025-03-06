const PasswordReset = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-md">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Password Reset Flow Vulnerabilities</h2>

      {/* Description */}
      <p className="mb-4">
        The password reset mechanism is essential for user convenience, but its security must be carefully implemented.
        A poorly secured password reset process can be exploited by attackers to take over accounts.
      </p>

      {/* Section: Reset Methods */}
      <h3 className="text-xl font-semibold mb-2">Common Password Reset Methods</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Email-Based Reset:</strong> A reset link is sent via email, requiring secure token generation.</li>
        <li><strong>Security Question-Based Reset:</strong> Users answer personal questions, but predictable answers can be exploited.</li>
        <li><strong>SMS-Based Reset:</strong> A code is sent via SMS, which can be intercepted via SIM swapping.</li>
      </ul>

      {/* Section: Attack Techniques */}
      <h3 className="text-xl font-semibold mb-2">Common Exploits & Weaknesses</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Predictable Tokens:</strong> If reset tokens follow a pattern, attackers can brute-force valid reset URLs.</li>
        <li><strong>Token Expiration Issues:</strong> Long-lived tokens provide a wider attack window for exploitation.</li>
        <li><strong>Insufficient Validation:</strong> Weak verification mechanisms allow attackers to reset passwords for other users.</li>
        <li><strong>Information Disclosure:</strong> Error messages revealing whether an email exists help attackers enumerate accounts.</li>
        <li><strong>Insecure Transport:</strong> Reset links sent over HTTP can be intercepted by network eavesdroppers.</li>
      </ul>

      {/* Section: Exploiting Predictable Tokens */}
      <h3 className="text-xl font-semibold mb-2">Exploiting Predictable Tokens</h3>
      <p className="mb-4">
        Some applications generate easily guessable reset tokens, allowing brute-force attacks. The following code example shows
        a vulnerable password reset function using a **3-digit token**:
      </p>

      {/* Code Block */}
      <div className="bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
        <pre className="text-green-300 text-sm">
          {`$token = mt_rand(100, 200);
$query = $conn->prepare("UPDATE users SET reset_token = ? WHERE email = ?");
$query->bind_param("ss", $token, $email);
$query->execute();`}
        </pre>
      </div>

      <p className="mb-4">
        The above code sets a **3-digit** password reset token (`100 - 200`). An attacker can **brute-force** all possible token values to reset an account.
      </p>

      {/* Section: Brute-Force Attack with Burp Suite */}
      <h3 className="text-xl font-semibold mb-2">Brute-Force Attack with Burp Suite</h3>
      <ol className="list-decimal pl-6 space-y-2 mb-4">
        <li>Navigate to the application's password reset page.</li>
        <li>Enter "admin@admin.com" and submit the form.</li>
        <li>Intercept the response with **Burp Suite**.</li>
        <li>Send the reset request to **Burp Intruder** and configure payloads for token brute-forcing.</li>
        <li>Use **Crunch** to generate token guesses (`100-200`).</li>
      </ol>

      {/* Code Block for Crunch */}
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

      
    </div>
  );
};

export default PasswordReset;
