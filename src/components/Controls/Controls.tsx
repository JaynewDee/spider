import { Invokers } from "../../api/invoke";
import { useState } from "react";
const Controls = () => {
  const [msg, setMsg] = useState("");

  const handleScrapeMe = async () => {
    const msg = await Invokers.scrapeMe();
    setMsg(msg);
  };
  const handleScrapeGoogle = async () => {
    const msg = await Invokers.scrapeGoogle();
    setMsg(msg);
  };
  return (
    <div>
      <div className="container">
        <button onClick={handleScrapeMe}>GET ME</button>
        <button onClick={handleScrapeGoogle}>GET GOOGLE</button>
        <button onClick={handleScrapeMe}>GET DEV</button>

        <div>{msg}</div>
      </div>
    </div>
  );
};

export default Controls;
