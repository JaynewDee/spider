import { ChangeEvent, useState } from "react";
import { Invokers } from "../../api/invoke";
import Domain from "../Domains/Domain";

export interface OptionsState {
  iframes: boolean;
}

interface ResultsState {
  loading: boolean;
  data: {
    name: string;
    domain: string;
    code: string;
  }[];
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
    const domains = await Invokers.getDomains();
    const parsed = JSON.parse(domains);
    setResults({ data: parsed, loading: false });
  };

  const updateOptionsState = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
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
      <button
        className="run-check-btn"
        disabled={results.loading}
        onClick={handleStatusFetch}
      >
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
