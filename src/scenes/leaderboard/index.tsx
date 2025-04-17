import { useEffect, useState } from "react";
import Navbar from "@/scenes/navbar";
import Footer from "@/scenes/footer";

interface LeaderboardEntry {
  user_id: number;
  username: string;
  correct_answers: number;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:8000/leaderboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }

        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-white">
      <Navbar />

      <main className="flex-grow px-4 py-10 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">🏆 Leaderboard</h1>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full border-collapse border border-gray-700 bg-gray-800">
              <thead>
                <tr className="text-left text-sm uppercase text-gray-400">
                  <th className="border border-gray-700 px-6 py-3">Rank</th>
                  <th className="border border-gray-700 px-6 py-3">User</th>
                  <th className="border border-gray-700 px-6 py-3">Correct Answers</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.user_id} className="hover:bg-gray-700">
                    <td className="border border-gray-700 px-6 py-4">{index + 1}</td>
                    <td className="border border-gray-700 px-6 py-4">{entry.username}</td>
                    <td className="border border-gray-700 px-6 py-4">{entry.correct_answers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {leaderboard.length === 0 && (
              <p className="text-center text-gray-400 mt-6">No leaderboard data yet.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;
