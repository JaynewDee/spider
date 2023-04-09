import { ChangeEvent, useState } from "react";
import { Invokers } from "../../api/invoke";
import LinkResult from "./LinkResult";
import SelectOptions from "./SelectOptions";

const Crawl = () => {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [emptyCrawl, setEmptyCrawl] = useState(false);
  const [filterState, setFilterState] = useState("");
  const [targetState, setTargetState] = useState("reddit");

  const handleCrawl = async () => {
    const { getHackerSrcs, getDevSrcs, getRedditSrcs } = Invokers;

    const hackers = targetState === "hackers";
    const reddit = targetState === "reddit";
    const dev = targetState === "dev";

    setLoading(true);

    const res = hackers
      ? await getHackerSrcs(17, filterState)
      : reddit
      ? await getRedditSrcs()
      : await getDevSrcs();
    if (res.length === 0) {
      setEmptyCrawl(true);
      return;
    }
    setEmptyCrawl(false);
    setResults(res);
    setLoading(false);
  };

  const handleTargetChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setTargetState(e.target.value);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilterState(e.target.value);

  const clearResults = () => setResults([]);
  return (
    <div>
      <div className="input-set">
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
        {results.length ? <button onClick={clearResults}>RESET</button> : <></>}
        {loading && <p>Crawling {targetState} at Spider speed ... </p>}
        {emptyCrawl && <p>You are approached by a sad, weary spider ... </p>}
      </div>
      {results.length ? (
        <div className="scraped-links-box">
          {results.map((src) => (
            <LinkResult src={src} />
          ))}
        </div>
      ) : (
        <></>
      )}
      {results.length === 0 && !loading ? <>Go Crawling ... </> : <></>}
    </div>
  );
};

export default Crawl;
