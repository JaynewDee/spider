import "./App.css";
import Controls from "./components/Controls/Controls";
import Domain from "./components/Domains/Domain";

import Header from "./components/Header/Header";

const App: React.FC<any> = () => {
  return (
    <>
      <Header />
      <Controls />
      <Domain />
    </>
  );
};

export default App;
