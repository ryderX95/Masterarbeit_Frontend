const AuthenticationEnumeration = () => {
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


    </div>
  );
};

export default AuthenticationEnumeration;
