import React from "react";

type Props = {
  onStartAttack: () => void;
  title: string;
};

const Header = ({ onStartAttack, title }: Props) => {
  return (
    <section className="bg-gray-900 py-10 px-6 text-center w-full">
      <div className="max-w-7xl mx-auto">
        <p className="mt-2 text-gray-400">Web Application Penetration Testing</p>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-gray-400">
          Enumerate and brute force authentication mechanisms.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={onStartAttack}
            className="bg-blue-600 px-4 py-2 rounded-md text-white"
          >
            Start AttackBox
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
