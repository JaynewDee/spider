import "./App.css";
import { Invokers } from "./api/invoke";
import { useState } from "react";

const App: React.FC<any> = () => {
  const [msg, setMsg] = useState("GET");

  const handleScrapeDev = async () => {
    const msg = await Invokers.scrapeMe();
    setMsg(msg);
  };

  return (
    <div className="container">
      <button onClick={handleScrapeDev}>{msg}</button>
    </div>
  );
};

export default App;
