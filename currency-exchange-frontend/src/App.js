import './App.css';
import {BrowserRouter} from 'react-router-dom';

import Header from "./components/layout/Header";
import Content from "./components/layout/Content";
import Toasts from "./util/Toasts";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Header/>
                <Content/>
                <Toasts/>
            </div>
        </BrowserRouter>
    );
}

export default App;
