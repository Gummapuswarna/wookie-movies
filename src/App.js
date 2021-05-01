import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard';
import MovieDetails from './components/MovieDetails';
import {
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <SearchBar />
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/movieDetails">
          <MovieDetails />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
