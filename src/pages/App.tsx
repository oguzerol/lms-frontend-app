import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../core/redux/rootReducer";

function App() {
  const count = useSelector((state: RootState) => state.auth);
  console.log(count);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
