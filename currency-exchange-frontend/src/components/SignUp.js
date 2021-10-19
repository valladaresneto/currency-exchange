import './SignUp.scss';
import {useState} from "react";
import { useHistory } from "react-router-dom";

import axios from 'axios';
import {useDispatch} from "react-redux";
import {addToastMessages} from "../redux/actions";

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/v1/user/signup', {
                email,
                password,
                confirmPassword
            });

            if (response.status === 201) {
                history.push("/dashboard");
            }
        } catch (error) {
            dispatch(addToastMessages(error.response.data.errors));
        }
    };

    return (
        <div className="sign-up-form">
            <form onSubmit={onSubmit} className="w-100">
                <h1 className="h3 mb-5">Sign Up</h1>
                <input className="form-control md-3"
                       onChange={(e) => setEmail(e.target.value)}
                       value={email}
                       placeholder="Email"/>
                <input className="form-control"
                       type="password"
                       onChange={(e) => setPassword(e.target.value)}
                       value={password}
                       placeholder="Password"/>
                <input className="form-control"
                       type="password"
                       onChange={(e) => setConfirmPassword(e.target.value)}
                       value={confirmPassword}
                       placeholder="Confirm Password"/>

                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUp;
