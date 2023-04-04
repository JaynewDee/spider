import { useState } from "react";
import { Invokers } from "../api/invoke";
import Domain from "./Domains/Domain";

export interface OptionsState {
  iframes: boolean;
}

interface ResultsState {
  loading: boolean;
  data: any[];
}

const Monitor = () => {
  const [optionsState, setOptionsState] = useState<OptionsState>({
    iframes: false
  });

  const [results, setResults] = useState<ResultsState>({
    loading: false,
    data: []
  });

  const handleStatusFetch = async () => {
    setResults({ data: [], loading: true });
    const msg = await Invokers.getDomains();
    const parsed = JSON.parse(msg);
    setResults({ data: parsed, loading: false });
  };

  const updateOptionsState = (e: any) => {
    const { name, checked } = e.target;
    setOptionsState((prev) => ({ ...prev, iframes: checked }));
  };

  return (
    <div>
      <div className="monitor-options-container">
        <h4>Options</h4>
        <label>IFRAMES:</label>
        <input
          className="checkbox iframe-option"
          type="checkbox"
          onChange={updateOptionsState}
          name="iframes"
        />
      </div>
      <button disabled={results.loading} onClick={handleStatusFetch}>
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
