const Introduction = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-md">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Introduction to Authentication Weaknesses</h2>

      {/* Description */}
      <p className="mb-4">
        Authentication is the first line of defense in most web applications — but even here, subtle misconfigurations
        can expose critical flaws. This module dives into the world of authentication vulnerabilities, with a focus on
        enumeration techniques that attackers often use to discover valid usernames or weak credential policies.
      </p>
      <p className="mb-4">
        You'll explore how seemingly harmless error messages can reveal sensitive logic, how weak password resets
        are manipulated, and how open-source intelligence (OSINT) helps attackers collect credentials.
      </p>

      {/* Objectives */}
      <h3 className="text-xl font-semibold mb-2">What You'll Learn</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Recognize how enumeration flaws leak information about valid users.</li>
        <li>Explore brute-force attack strategies and how enumeration supports them.</li>
        <li>Analyze verbose error messages and how they aid attackers.</li>
        <li>Use real tools like Burp Suite to exploit flawed authentication workflows.</li>
      </ul>
    </div>
  );
};

export default Introduction;
