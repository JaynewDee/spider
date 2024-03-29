import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Monitor from "./components/Monitor/Monitor";
import Crawl from "./components/Crawl/Crawl";
import Nav from "./components/Nav/Nav";

function App() {
  const [displayState, setDisplayState] = useState("monitor");

  const displaySwitch = (displayState: string) => {
    const displays: { [key: string]: JSX.Element } = {
      monitor: <Monitor />,
      crawl: <Crawl />
    };
    return displays[displayState] || <></>;
  };

  return (
    <>
      <Header />
      <Nav displayState={displayState} setDisplayState={setDisplayState} />
      <div className="main-display">{displaySwitch(displayState)}</div>
    </>
  );
}

export default App;
