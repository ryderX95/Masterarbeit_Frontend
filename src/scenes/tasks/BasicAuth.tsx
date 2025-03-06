const BasicAuth = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-md">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Basic Authentication in 2024?</h2>

      {/* Description */}
      <p className="mb-4">
        Basic authentication is widely used for securing access to network devices such as routers, requiring only a **username** and **password**.  
        While simple, it **lacks encryption** and is vulnerable to **brute-force attacks** when weak credentials are used.
      </p>

      {/* Section: How HTTP Basic Auth Works */}
      <h3 className="text-xl font-semibold mb-2">How HTTP Basic Authentication Works</h3>
      <p className="mb-4">
        HTTP Basic Authentication follows **RFC 7617**, which encodes credentials (`username:password`) in **Base64** format and sends them in the HTTP headers:
      </p>

      {/* Code Block */}
      <div className="bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
        <pre className="text-green-300 text-sm">
          {`Authorization: Basic <base64-encoded-credentials>`}
        </pre>
      </div>

      <p className="mb-4">
        Since **Base64 is not encryption**, credentials can be easily **decoded** and exposed if sent over **non-HTTPS** connections.
      </p>

      {/* Section: Exploiting Basic Authentication */}
      <h3 className="text-xl font-semibold mb-2">Exploiting Basic Authentication</h3>
      <p className="mb-4">
        To demonstrate an attack, navigate to:
        <br />
        <a href="http://enum.thm/labs/basic_auth/" className="text-blue-400 underline">
          http://enum.thm/labs/basic_auth/
        </a>
      </p>

      {/* Steps: Capturing Credentials in Burp Suite */}
      <h3 className="text-lg font-semibold mb-2">Step 1: Capture the Authentication Request</h3>
      <ul className="list-decimal pl-6 space-y-2 mb-4">
        <li>Enter **any** username and password in the authentication prompt.</li>
        <li>Use **Burp Suite** to capture the request.</li>
        <li>Locate the `Authorization` header containing the **Base64-encoded** credentials.</li>
      </ul>

      {/* Image Placeholder for Burp Suite Capturing */}
      <div className="bg-gray-800 p-4 rounded-md mb-4 text-center">
        <p className="text-gray-400">🔍 Burp Suite Captured Request (Authorization Header)</p>
      </div>

      {/* Steps: Brute-Forcing Basic Authentication */}
      <h3 className="text-lg font-semibold mb-2">Step 2: Brute-Forcing with Burp Suite</h3>
      <ul className="list-decimal pl-6 space-y-2 mb-4">
        <li>Send the captured request to **Intruder**.</li>
        <li>Use **Payload Processing** to:
          <ul className="list-disc pl-6 space-y-1">
            <li>Add `username:password` format.</li>
            <li>Base64 encode each entry.</li>
          </ul>
        </li>
        <li>Select a **wordlist** (e.g., `500-worst-passwords.txt`).</li>
        <li>Start the attack and look for **Status Code 200** (successful login).</li>
      </ul>

      {/* Image Placeholder for Burp Suite Attack */}
      <div className="bg-gray-800 p-4 rounded-md mb-4 text-center">
        <p className="text-gray-400">💻 Burp Suite Intruder Brute-Force Attack</p>
      </div>

      {/* Steps: Decoding Base64 & Gaining Access */}
      <h3 className="text-lg font-semibold mb-2">Step 3: Decode Base64 & Gain Access</h3>
      <ul className="list-decimal pl-6 space-y-2 mb-4">
        <li>Find the **successful request** (Status Code 200).</li>
        <li>Copy the **Base64-encoded** credentials.</li>
        <li>Decode them using a command or website:
          <div className="bg-gray-800 p-4 rounded-md mt-2 overflow-x-auto">
            <pre className="text-green-300 text-sm">
              {`echo 'YWRtaW46cGFzc3dvcmQ=' | base64 --decode`}
            </pre>
          </div>
        </li>
        <li>Use the decoded credentials to **log in** to the application.</li>
      </ul>

      {/* Image Placeholder for Decoded Credentials */}
      <div className="bg-gray-800 p-4 rounded-md mb-4 text-center">
        <p className="text-gray-400">🔓 Successfully Decoded Credentials</p>
      </div>
    </div>
  );
};

export default BasicAuth;
