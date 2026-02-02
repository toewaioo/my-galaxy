import React from "react";
import "./index.css";
import Scene from "./components/Scene";
import Overlay from "./components/Overlay";

import ErrorBoundary from "./components/ErrorBoundary";

import { useState } from "react";

function App() {
  const [selectedMemory, setSelectedMemory] = useState<{
    image: string;
    message: string;
  } | null>(null);

  return (
    <ErrorBoundary>
      <div style={{ width: "100dvw", height: "100dvh", position: "relative" }}>
        <Overlay
          selectedMemory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
        />
        <Scene onSelectMemory={setSelectedMemory} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
