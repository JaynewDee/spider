import "./App.css";
import Controls from "./components/Controls/Controls";

import Header from "./components/Header/Header";

const App: React.FC<any> = () => {
  return (
    <>
      <Header />
      <Controls />
    </>
  );
};

export default App;
