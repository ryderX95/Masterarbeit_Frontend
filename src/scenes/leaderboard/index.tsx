import { useEffect, useState } from "react";

interface LeaderboardEntry {
  user_id: number;
  username: string;
  correct_answers: number;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetch("/api/leaderboard") // ✅ Adjust this endpoint if necessary
      .then((res) => res.json())
      .then((data) => setLeaderboard(data))
      .catch((error) => console.error("Error fetching leaderboard:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-700 px-4 py-2">Rank</th>
            <th className="border border-gray-700 px-4 py-2">User</th>
            <th className="border border-gray-700 px-4 py-2">Correct Answers</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.user_id} className="border border-gray-700">
              <td className="border border-gray-700 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-700 px-4 py-2">{entry.username}</td>
              <td className="border border-gray-700 px-4 py-2">{entry.correct_answers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
