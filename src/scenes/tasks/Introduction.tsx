const Introduction = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-md">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Introduction</h2>

      {/* Description */}
      <p className="mb-4">
        Authentication enumeration is a fundamental aspect of security testing, concentrating specifically on the mechanisms that protect sensitive aspects of web applications.
        This process involves methodically inspecting various authentication components ranging from username validation to password policies and session management.
        Each of these elements is meticulously tested because they represent potential vulnerabilities that, if exploited, could lead to significant security breaches.
      </p>

      {/* Objectives */}
      <h3 className="text-xl font-semibold mb-2">Objectives</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Understand the significance of enumeration and how it sets the stage for effective brute-force attacks.</li>
        <li>Learn advanced enumeration methods, mainly focusing on extracting information from verbose error messages.</li>
        <li>Comprehend the relationship between enumeration and brute-force attacks in compromising authentication mechanisms.</li>
        <li>Gain practical experience using tools and techniques for both enumeration and brute-force attacks.</li>
      </ul>

      {/* Pre-requisites */}
      <h3 className="text-xl font-semibold mb-2">Pre-requisites</h3>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Familiarity with HTTP and HTTPS, including request/response structures and common status codes.</li>
        <li>Experience using tools like Burp Suite.</li>
        <li>Basic proficiency in navigating and using the Linux command line.</li>
      </ul>

      {/* Buttons Section */}
      <div className="flex space-x-4">
        {/* Start Machine Button */}
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded-md cursor-not-allowed opacity-50 flex items-center"
          disabled
        >
          <span className="mr-2">▶</span> Start Vulnerable Web App Machine
        </button>        
      </div>
    </div>
  );
};

export default Introduction;
