const Conclusion = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-md">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">🔚 Conclusion</h2>

      {/* Summary */}
      <p className="mb-4">
        Throughout this training, we've explored various aspects of **enumeration and brute-force attacks**, equipping you with both the **theoretical knowledge** and **practical skills** required for security assessments.
      </p>

      {/* Key Takeaways Section */}
      <h3 className="text-xl font-semibold mb-2">📌 Key Takeaways</h3>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Effective Enumeration:</strong> Discovering valid users, hidden endpoints, and security misconfigurations is a crucial first step.</li>
        <li><strong>Brute Force Efficiency:</strong> Using optimized wordlists, understanding rate-limiting, and detecting lockout mechanisms can improve attack efficiency.</li>
        <li><strong>Ethical Responsibility:</strong> Always perform security testing with **explicit permission** to avoid legal and ethical violations.</li>
      </ul>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        {/* Submit Report Button */}
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          onClick={() => console.log("Submitting Report...")}
        >
          Submit Report
        </button>

        {/* Restart Training Button */}
        <button
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          onClick={() => console.log("Restarting Training...")}
        >
          Restart Training
        </button>
      </div>
    </div>
  );
};

export default Conclusion;
