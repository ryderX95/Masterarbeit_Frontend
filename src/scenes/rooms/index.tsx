import { useNavigate } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import Footer from "@/scenes/footer"; 

const rooms = [
  {
    id: "authentication",
    title: "Authentication",
    description: "Master enumeration and brute-force authentication mechanisms through real-world scenarios.",
  },
  {
    id: "injection-attacks",
    title: "Injection Attacks",
    description: "Practice SQL injection, command injection, and XSS across various real-world scenarios.",
  },
  {
    id: "server-side-exploits",
    title: "Server-Side Exploits",
    description: "Explore SSRF, insecure deserialization, and file inclusion vulnerabilities on the server.",
  },
  {
    id: "advanced-client-side",
    title: "Advanced Client-Side Attacks",
    description: "Master client-side security issues including DOM-based XSS, CSRF, and front-end bypasses.",
  },
];

const Rooms = () => {
  const navigate = useNavigate();

  return (
    <div className="text-white bg-gray-900 min-h-screen flex flex-col">
      <Navbar />

      {/* Intro Section */}
      <section className="text-center px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">🧪 Web Application Pentesting</h1>
        <p className="max-w-3xl mx-auto text-gray-300">
          Every day you interact with web applications. This path covers key attack categories to help
          you become a skilled web application penetration tester — including enumeration, injection,
          client-side attacks, and server-side logic flaws.
        </p>
      </section>

      {/* Room Cards Section */}
      <section className="bg-gray-800 px-4 py-12 flex-grow flex-col">
        <div className="max-w-2xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer"
              onClick={() => navigate(`/rooms/${room.id}`)}
            >
              <h2 className="text-lg font-semibold mb-2">
                {room.title}{" "}
              </h2>
              <p className="text-sm text-gray-300">{room.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rooms;
