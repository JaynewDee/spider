import "./App.css";
import { Invokers } from "./api/invoke";
import { useState } from "react";

const App: React.FC<any> = () => {
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
    <div className="container">
      <button onClick={handleScrapeMe}>GET ME</button>
      <button onClick={handleScrapeGoogle}>GET GOOGLE</button>
      <button onClick={handleScrapeMe}>GET DEV</button>

      <div>{msg}</div>
    </div>
  );
};

export default App;
