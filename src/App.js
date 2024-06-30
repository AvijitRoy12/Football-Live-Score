import "./App.css";
import MatchList from "./components/MatchList";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <MatchList />
      </main>
    </div>
  );
}

export default App;
