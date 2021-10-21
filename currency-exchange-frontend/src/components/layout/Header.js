import './Header.scss';
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import {addToastMessages, setLoggedUser} from "../../redux/actions";
import {isLoggedIn} from "../../service/AuthService";

function Header() {
    const email = useSelector(state => state.user.email && state.user.email !== 'null' ? state.user.email : null);
    const [authenticated, setAuthenticated] = useState(isLoggedIn());

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setAuthenticated(email !== null);
    }, [email]);

    const signout = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('/api/v1/user/signout');

            if (response.status === 200) {
                localStorage.removeItem('emailLoggedUser')
                dispatch(setLoggedUser(null));
                history.push("/signin");
            }
        } catch (error) {
            dispatch(addToastMessages(error.response.data.errors));
        }
    };

    return (
        <header className="app-header d-flex align-items-center">
            <nav className="navbar navbar-expand-md navbar-light w-100">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand fw-bold">
                        Currency Exchange
                    </Link>
                    <button className="navbar-toggler" type="button">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            {authenticated &&
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                            }
                            {authenticated &&
                            <li className="nav-item">
                                <a href="/#" onClick={signout} className="nav-link">
                                    Sign out
                                </a>
                            </li>
                            }
                            {!authenticated &&
                            <li className="nav-item">
                                <Link to="/signin" className="nav-link">
                                    Sign In
                                </Link>
                            </li>
                            }
                            {!authenticated &&
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
