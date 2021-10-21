import './Content.css';
import {Route, Switch, withRouter} from 'react-router-dom'
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Dashboard from "../Dashboard";
import PrivateRoute from "../../routes/PrivateRoute";
import {isLoggedIn} from "../../service/AuthService";
import NotLoggedRoute from "../../routes/NotLoggedRoute";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

function Content() {
    const email = useSelector(state => state.user.email && state.user.email !== 'null' ? state.user.email : null);
    const [authenticated, setAuthenticated] = useState(isLoggedIn());

    useEffect(() => {
        setAuthenticated(email !== null);
    }, [email]);

    return (
        <main className="app-content container-fluid">
            <Switch>
                <PrivateRoute path="/dashboard" authenticated={authenticated} component={Dashboard} />
                <NotLoggedRoute path="/signin" authenticated={authenticated} component={SignIn} />
                <NotLoggedRoute path="/signup" authenticated={authenticated} component={SignUp} />
                <Route path="/">
                    {authenticated ? <Dashboard/> : <SignIn/>}
                </Route>
            </Switch>
        </main>
    );
}

export default withRouter(Content);
