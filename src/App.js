import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';

const App = () => {
  return (
    <div className="App">
      {/* TODO create HEADER (component) with routes */}
      {/* TODO create HomePage (component) */}
      {/* TODO create Footer (component) */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button>remove this, it is needed to check bootstrap</Button>
      </header>
    </div>
  );
}

export default App;
