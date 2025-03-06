const OSINT = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-md">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Wayback URLs & Google Dorks</h2>

      {/* Description */}
      <p className="mb-4">
        OSINT (**Open-Source Intelligence**) is a powerful technique used to gather information from publicly available sources.
        Attackers and security professionals use these techniques to **map out** a target’s infrastructure, uncover hidden data, and
        exploit exposed vulnerabilities.
      </p>

      {/* Section: Wayback Machine */}
      <h3 className="text-xl font-semibold mb-2">⏳ Wayback Machine</h3>
      <p className="mb-4">
        The **Wayback Machine** (<a href="https://archive.org/web/" className="text-blue-400 underline">archive.org/web</a>) lets you view **old versions** of websites.  
        This can reveal **deprecated endpoints, forgotten files, or outdated pages** that might still be accessible on the server.
      </p>

      {/* Screenshot Placeholder for Wayback Machine */}
      <div className="bg-gray-800 p-4 rounded-md mb-4 text-center">
        <p className="text-gray-400">🌐 Screenshot of Wayback Machine homepage</p>
      </div>

      {/* Using WaybackURLs Tool */}
      <h3 className="text-lg font-semibold mb-2">🛠 Using `waybackurls` to Extract Old Links</h3>
      <p className="mb-4">
        We can use the `waybackurls` tool to extract **historical URLs** of a website from the **Wayback Machine**:
      </p>

      {/* Code Block for Installing waybackurls */}
      <div className="bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
        <pre className="text-green-300 text-sm">
          {`# Install waybackurls tool
git clone https://github.com/tomnomnom/waybackurls
cd waybackurls
go build

# Use waybackurls to extract saved links
echo "target.com" | ./waybackurls`}
        </pre>
      </div>

      <p className="mb-4">
        This will output a **list of archived links**, some of which might still be accessible today.
      </p>

      {/* Screenshot Placeholder for waybackurls output */}
      <div className="bg-gray-800 p-4 rounded-md mb-4 text-center">
        <p className="text-gray-400">📜 List of extracted historical URLs</p>
      </div>

      {/* Section: Google Dorking */}
      <h3 className="text-xl font-semibold mb-2">🔎 Google Dorks</h3>
      <p className="mb-4">
        Google Dorking is a technique used to **search for hidden information** using **advanced Google queries**.
      </p>

      {/* Code Block for Google Dorking Examples */}
      <div className="bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
        <pre className="text-green-300 text-sm">
          {`# Find login panels:
site:example.com inurl:admin

# Find log files that might contain passwords:
filetype:log "password" site:example.com

# Discover exposed backup files:
intitle:"index of" "backup" site:example.com`}
        </pre>
      </div>

      <p className="mb-4">
        These queries can reveal **exposed files, misconfigured directories, or sensitive login pages**.
      </p>

      {/* Screenshot Placeholder for Google Dorking */}
      <div className="bg-gray-800 p-4 rounded-md mb-4 text-center">
        <p className="text-gray-400">🔍 Google Dorking Search Results</p>
      </div>

      
    </div>
  );
};

export default OSINT;
