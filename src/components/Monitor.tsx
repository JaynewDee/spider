import { useState } from "react";
import { Invokers } from "../api/invoke";
import Domain from "./Domains/Domain";

const Monitor = () => {
  const [msg, setMsg] = useState([]);
  const handleScrapeMe = async () => {
    const msg = await Invokers.getDomains();
    const parsed = JSON.parse(msg);
    setMsg(parsed);
  };
  return (
    <div>
      {" "}
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
    </div>
  );
};

export default Monitor;
