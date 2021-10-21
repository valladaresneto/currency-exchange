import './SignIn.scss';
import {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {addToastMessages, setLoggedUser} from "../redux/actions";
import {useDispatch} from "react-redux";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/v1/user/signin', {
                email,
                password
            });

            if (response.status === 200) {
                dispatch(setLoggedUser(response.data.email));
                history.push("/dashboard");
            }
        } catch (error) {
            dispatch(addToastMessages(error.response.data.errors));
        }
    };

    return (
        <div className="sign-in-form">
            <form onSubmit={onSubmit} className="w-100">
                <h1 className="h3 mb-5">Sign In</h1>
                <input className="form-control md-3"
                       onChange={(e) => setEmail(e.target.value)}
                       value={email}
                       placeholder="Email"/>
                <input className="form-control"
                       type="password"
                       onChange={(e) => setPassword(e.target.value)}
                       value={password}
                       placeholder="Password"/>

                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default SignIn;
