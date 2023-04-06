import { ChangeEvent, useState } from "react";
import { Invokers } from "../../api/invoke";
import LinkResult from "./LinkResult";
import SelectOptions from "./SelectOptions";

const Crawl = () => {
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

  const handleTargetChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setTargetState(e.target.value);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilterState(e.target.value);

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
          {SelectOptions()}
        </select>
        <button onClick={handleCrawl}>CRAWL</button>
      </div>
      {results.length ? (
        <div className="scraped-links-box">
          {results.map((src) => (
            <LinkResult src={src} />
          ))}
        </div>
      ) : (
        <p>Go Crawling ...</p>
      )}
    </div>
  );
};

export default Crawl;
