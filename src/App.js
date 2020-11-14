import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./containers/login/login";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login">
            <About />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    </Router>
    // <Router>
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // </Router>
  );
}

export default App;

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users(props) {
  const a = props.history;
  debugger;
  return <h2>Users</h2>;
}
