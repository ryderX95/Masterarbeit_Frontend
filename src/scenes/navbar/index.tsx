import { useState } from "react";
import { FaBars, FaTimes, FaTrophy } from "react-icons/fa"; // Import Trophy Icon
import Link from "./Link"; 
import { SelectedPage } from "@/shared/types";
import ActionButton from "@/shared/ActionButton";
import logo from "@/assets/Logo.svg";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Leaderboard);

  return (
    <nav className="bg-background text-text py-4 px-6 justify-center">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* LOGO */}
        <a href="/" className="flex items-center text-lg font-bold">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2 filter invert" />
          CyberX
        </a>

        {/* NAV LINKS */}
        <ul className="hidden md:flex space-x-6 text-sm">
          <li className="flex items-center space-x-2">
            <FaTrophy className="text-yellow-500" /> {/* Trophy Icon */}
            <Link page={SelectedPage.Leaderboard} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
          </li>
        </ul>

        {/* BUTTONS CONTAINER - PLACED CLOSER TOGETHER */}
        <div className="hidden md:flex space-x-2">
          {/* Start AttackBox Button */}
          <ActionButton setSelectedPage={setSelectedPage}>
            Start AttackBox
          </ActionButton>

          {/* Logout Button */}
          <button
            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
            onClick={() => {
              localStorage.removeItem("auth"); 
              window.location.href = "/login"; 
            }}
          >
            Logout
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden text-xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE NAV MENU */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 py-4 px-6">
          <ul className="flex flex-col space-y-4">
            <li className="flex items-center space-x-2">
              <FaTrophy className="text-yellow-500" />
              <Link page={SelectedPage.Leaderboard} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            </li>
          </ul>
          <div className="mt-4 flex flex-col space-y-2">
            {/* Start AttackBox Button */}
            <ActionButton setSelectedPage={setSelectedPage}>
              Start AttackBox
            </ActionButton>

            {/* Logout Button */}
            <button
              className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
              onClick={() => {
                localStorage.removeItem("auth");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
