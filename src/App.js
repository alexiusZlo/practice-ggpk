import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import NaviBar from './components/header/header';
import FoOter from './components/footer/footer'
/*import { homePage } from './components/pages/homePage/homePage';*/
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';

const App = () => {
    return (
        <>
            <Router>
                <NaviBar />
                
                {/*<Switch>
                    <Route exact path="/" component={homePage}/>
                </Switch>*/}
            </Router>
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
                <FoOter />
            </div>
        </>
  );
}

export default App;
