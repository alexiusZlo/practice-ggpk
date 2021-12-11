import './App.css';
import NaviBar from './components/header/header';
import FoOter from './components/footer/footer'
import homePage from './pages/homePage/homePage';
import News from './pages/news/news';
import {
    BrowserRouter as Router,
    Route,
    Routes,//==Switch in 'react-router-dom' v6
    Link
} from 'react-router-dom';

const App = () => {
    return (
        <>
            <header>
                <Router>
                    <div className="App">
                        {/* TODO create HEADER (component) with routes */}
                        {/* TODO create HomePage (component) */}
                        {/* TODO create Footer (component) */}
                        <NaviBar />
                        <Routes>
                            <Route exact path="/" component={homePage} />
                            <Route path="/news" component={News} />
                        </Routes>
                    </div>
                </Router>
            </header>
            <FoOter />
        </>
  );
}

export default App;
