import "./App.css";
import { useSlickToc } from "../useSlickToc/useSlickToc";
import { Page } from "./Page";
function App() {
  const [registerSection, TOC] = useSlickToc();

  return (
    <div className="App">
      <div>
        <h3>Table of Contents</h3>
        {TOC}
      </div>
      <div>
        <Page registerSection={registerSection} />
      </div>
    </div>
  );
}

export default App;
