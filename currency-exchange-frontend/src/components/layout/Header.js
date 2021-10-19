import './Header.scss';
import {Link} from 'react-router-dom'

function Header() {
    return (
        <header className="app-header">
            <nav className="navbar navbar-expand-md navbar-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        Currency Exchange
                    </Link>
                    <button className="navbar-toggler" type="button">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signin" className="nav-link">
                                    Sign In
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
