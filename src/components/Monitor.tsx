import { useState } from "react";
import { Invokers } from "../api/invoke";
import Domain from "./Domains/Domain";

export interface OptionsState {
  iframes: "on" | "off";
}

interface ResultsState {
  loading: boolean;
  data: any[];
}

const Monitor = () => {
  const [optionsState, setOptionsState] = useState<OptionsState>({
    iframes: "off"
  });

  const [results, setResults] = useState<ResultsState>({
    loading: false,
    data: []
  });

  const handleScrapeMe = async () => {
    setResults((prev) => ({ ...prev, loading: true }));
    const msg = await Invokers.getDomains();
    const parsed = JSON.parse(msg);
    setResults({ data: parsed, loading: false });
  };

  const updateOptionsState = (e: any) => {
    const { name, value } = e.target;
    console.log(value);

    setOptionsState((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <div className="monitor-options-container">
        <h4>Options</h4>
        <label>INCLUDE IFRAMES:</label>
        <input type="checkbox" onChange={updateOptionsState} name="iframes" />
      </div>
      <button disabled={results.loading} onClick={handleScrapeMe}>
        CHECK
      </button>
      {results.data.length ? (
        <>
          {results.data.map((d) => (
            <Domain data={d} options={optionsState} />
          ))}
        </>
      ) : (
        <p>Activate health check to retrieve status report.</p>
      )}
    </div>
  );
};

export default Monitor;
