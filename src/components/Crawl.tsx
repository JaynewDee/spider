import React, { useState } from "react";
import { Invokers } from "../api/invoke";

const Crawl = () => {
  const [notification, setNotification] = useState("");
  const [srcs, setSrcs] = useState<string[]>([]);
  const [filterState, setFilterState] = useState("");

  const handleGetHackers = async () => {
    const res = await Invokers.getHackerSrcs(17, filterState || "https");
    if (res.length === 0) {
      setNotification(
        `You are greeted by a sad, empty-handed spider. ::: ${new Date().toLocaleTimeString()}`
      );
    }
    setSrcs(res);
  };

  const handleGetReddit = async () => {
    const res = await Invokers.getRedditSrcs();
    setSrcs(res);
  };

  const handleFilterChange = (e: any) => {
    setFilterState(e.target.value);
  };

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
        <button onClick={handleGetHackers}>Crawl Hacker News</button>
        <button onClick={handleGetReddit}>Crawl Reddit</button>
      </div>
      {notification ? <p>{notification}</p> : <></>}
      {srcs.length ? (
        <div className="scraped-links-box">
          {srcs.map((src) => (
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
