import './App.css';
import NaviBar from './components/header/header';
import FoOter from './components/footer/footer';
import Home from './pages/homePage/homePage';
import News from './pages/news/news';
import {
    BrowserRouter as Router,
    Route,
    Routes,//==Switch in 'react-router-dom' v6
    Link
} from 'react-router-dom';

{/* TODO create HEADER (component) with routes */ }
{/* TODO create HomePage (component) */ }
{/* TODO create Footer (component) */ }

const App = () => {
    return (
        <>
            <header>
                <NaviBar />
            </header>
            <body>
                <div>
                    <Router>
                        <Routes>
                            <Route exact path="/" element={<Home/>} />
                            <Route exact path="/news" element={<News/>} />
                        </Routes>
                    </Router>
                </div>
            </body>
            <footer>
                <FoOter />
            </footer>  
        </>
  );
}

export default App;
