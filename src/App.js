import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard';
import MovieDetails from './components/MovieDetails';
import {
  Switch,
  Route
} from "react-router-dom";
import { useState } from 'react';
function App() {
  const [searchedData,setSearchedData] = useState([])
  const getSearchedData = (val) =>{
    setSearchedData(val)
  }
  return (
    <div className="App">
      <SearchBar getSearchedData={getSearchedData}/>
      <Switch>
        <Route exact path="/">
          <Dashboard searchedData={searchedData}/>
        </Route>
        <Route path="/movieDetails/:id">
          <MovieDetails />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
