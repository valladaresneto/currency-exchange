import './Content.css';
import {Switch, Route} from 'react-router-dom'
import Home from "../Home";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Dashboard from "../Dashboard";

function Content() {
    return (
        <main className="app-content">
            <Switch>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
                <Route path="/signin">
                    <SignIn/>
                </Route>
                <Route path="/signup">
                    <SignUp/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </main>
    );
}

export default Content;
