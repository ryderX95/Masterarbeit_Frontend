import logo from "@/assets/Logo.svg";

const Footer = () => {
  return (
    <footer className="bg-background text-white py-6 px-6 text-center">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <p>Created by <span className="font-bold">Basnakajev Timur-Ali</span></p>
        <p>Thank you for your participation!</p>
        
        {/* Logo + CyberX (Aligned) */}
        <div className="flex items-center space-x-2 mt-2">
          <img src={logo} alt="Logo" className="w-8 h-8 filter invert" />
          <p className="font-bold text-lg">CyberX</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
