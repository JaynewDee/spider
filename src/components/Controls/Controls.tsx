import { Invokers } from "../../api/invoke";
import { useState } from "react";
import Domain from "../Domains/Domain";
const Controls = () => {
  const [msg, setMsg] = useState([]);

  const handleScrapeMe = async () => {
    const msg = await Invokers.getDomains();
    const parsed = JSON.parse(msg);
    setMsg(parsed);
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
      </div>
    </div>
  );
};

export default Controls;
