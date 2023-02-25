import "./App.css";
import { Invokers } from "./api/invoke";

function App() {
  const handleScrapeDev = async () => {
    const msg = await Invokers.scrapeDev();
    console.log(msg);
  };

  return (
    <div className="container">
      <button onClick={handleScrapeDev}>SCRAPE DEV</button>
    </div>
  );
}

export default App;
