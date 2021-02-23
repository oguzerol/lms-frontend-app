import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setAuth } from "../core/redux/auth";

function App() {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  console.log(auth);

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
        <button onClick={() => dispatch(setAuth({ id: 1, email: "asd" }))}>
          test
        </button>
      </header>
    </div>
  );
}

export default App;
