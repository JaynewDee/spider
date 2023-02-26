import { Invokers } from "../../api/invoke";
import { useState } from "react";
import Domain from "../Domains/Domain";
const Controls = () => {
  const [msg, setMsg] = useState([]);

  const handleScrapeMe = async () => {
    const msg = await Invokers.scrapeMe();
    const parsed = JSON.parse(msg);
    setMsg(parsed);
  };

  return (
    <div>
      <div className="container">
        <button onClick={handleScrapeMe}>HEALTH CHECK</button>
        {msg.length && (
          <>
            {msg.map((d) => (
              <Domain data={d} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Controls;
