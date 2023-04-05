import { useState } from "react";
import { Invokers } from "../../api/invoke";

const Crawl = () => {
  const [notification, setNotification] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [filterState, setFilterState] = useState("");
  const [targetState, setTargetState] = useState("reddit");

  const handleCrawl = async () => {
    const { getHackerSrcs, getDevSrcs, getRedditSrcs } = Invokers;

    const hackers = targetState === "hackers";
    const reddit = targetState === "reddit";
    const dev = targetState === "dev";
    const res = hackers
      ? await getHackerSrcs(17, filterState)
      : reddit
      ? await getRedditSrcs()
      : await getDevSrcs();

    setResults(res);
  };

  const handleTargetChange = (e: any) => setTargetState(e.target.value);

  const handleFilterChange = (e: any) => setFilterState(e.target.value);

  const crawlOptions = ["Reddit", "Hackers", "Dev"];

  return (
    <div>
      <div className="input-btn-pair">
        <label>Filter:</label>
        <input
          value={filterState}
          name="filter"
          type="text"
          onChange={handleFilterChange}
        />
        <select name="targets" id="crawl-select" onChange={handleTargetChange}>
          {crawlOptions.map((opt) => (
            <option key={opt} value={opt.toLowerCase()}>
              {opt}
            </option>
          ))}
        </select>
        <button onClick={handleCrawl}>CRAWL</button>
      </div>
      {notification ? <p>{notification}</p> : <></>}
      {results.length ? (
        <div className="scraped-links-box">
          {results.map((src) => (
            <a className="scraped-link" href={src}>
              {src}
            </a>
          ))}
        </div>
      ) : (
        <p>Go Crawling ...</p>
      )}
    </div>
  );
};

export default Crawl;
