import "./App.css";
import About from "../About/About";
import Content from "../Content/Content";
import { PointerEventHandler, useState } from "react";

const App = () => {
  const [showAbout, setShowAbout] = useState(false);

  // Toggle
  const onTogglePointerDown: PointerEventHandler = (event) => {
    // Don't use this tap for the tempo
    event.stopPropagation();
  };

  const onTogglePointerUp = () => {
    setShowAbout((previous) => !previous);
  };

  return (
    <div className="App">
      <About hidden={!showAbout} />
      <Content hidden={showAbout} />
      <div
        className="toggle"
        onPointerDown={onTogglePointerDown}
        onPointerUp={onTogglePointerUp}
      >
        =
      </div>
    </div>
  );
};

export default App;
