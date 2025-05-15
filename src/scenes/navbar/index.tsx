import { useState } from "react";
import { FaBars, FaTimes, FaTrophy } from "react-icons/fa";
import logo from "@/assets/Logo.svg";

type Props = {
  onStartAttack: () => void;
};

const Navbar = ({ onStartAttack }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-background text-text py-4 px-6 justify-center">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* LOGO */}
        <a href="/" className="flex items-center text-lg font-bold">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2 filter invert" />
          CyberX
        </a>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex space-x-6 text-sm">
          <li className="flex items-center space-x-2">
            <a
              href="/leaderboard"
              className="flex items-center text-yellow-500 hover:text-yellow-400"
            >
              <FaTrophy />
              <span className="ml-1">Leaderboard</span>
            </a>
          </li>
        </ul>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex space-x-2">
          <button
            onClick={onStartAttack}
            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 text-white"
          >
            Start AttackBox
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 text-white"
          >
            Logout
          </button>
        </div>

        {/* MOBILE MENU ICON */}
        <button className="md:hidden text-xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE NAV */}
      {isOpen && (
        <div className="md:hidden flex justify-end pr-4 mt-2">
          <div className="bg-gray-800 rounded-lg px-4 py-3 space-y-4 w-64 shadow-lg">
            {/* Leaderboard Link */}
            <div className="flex justify-start">
              <a
                href="/leaderboard"
                className="flex items-center space-x-2 text-yellow-500 hover:text-yellow-400"
              >
                <FaTrophy />
                <span>Leaderboard</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              <button
                onClick={onStartAttack}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
              >
                Start AttackBox
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
