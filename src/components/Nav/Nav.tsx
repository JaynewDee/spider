const Nav: React.FC<any> = ({ displayState, setDisplayState }) => {
  const displayMonitor = () => setDisplayState("monitor");
  const displayCrawl = () => setDisplayState("crawl");

  return (
    <nav className="nav-container">
      <button disabled={displayState === "monitor"} onClick={displayMonitor}>
        MONITOR
      </button>
      <button disabled={displayState === "crawl"} onClick={displayCrawl}>
        CRAWL
      </button>
    </nav>
  );
};

export default Nav;
