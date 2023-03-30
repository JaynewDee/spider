import { Invokers } from "../../api/invoke";
import { useState } from "react";
import Domain from "../Domains/Domain";
const Controls = () => {
  const [msg, setMsg] = useState([]);
  const [srcs, setSrcs] = useState<string[]>([]);
  const [filterState, setFilterState] = useState("");
  const handleScrapeMe = async () => {
    const msg = await Invokers.getDomains();
    const parsed = JSON.parse(msg);
    setMsg(parsed);
  };

  const handleGetHackers = async () => {
    const res = await Invokers.getHackerSrcs(17, filterState || "https");
    setSrcs(res);
  };
  const handleFilterChange = (e: any) => {
    setFilterState(e.target.value);
  };
  return (
    <div>
      <div className="container">
        <button onClick={handleScrapeMe}>HEALTH CHECK</button>
        {msg.length ? (
          <>
            {msg.map((d) => (
              <Domain data={d} />
            ))}
          </>
        ) : (
          <p>Activate health check to retrieve status report.</p>
        )}
        <button onClick={handleGetHackers}>Crawl Hacker News</button>
        <label>Filter:</label>
        <input
          value={filterState}
          name="filter"
          type="text"
          onChange={handleFilterChange}
        />
        {srcs.length ? (
          <>
            {srcs.map((src) => (
              <p>{src}</p>
            ))}
          </>
        ) : (
          <p>Go Crawling ...</p>
        )}
      </div>
    </div>
  );
};

export default Controls;
