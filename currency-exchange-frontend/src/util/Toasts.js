import './Toast.scss'

import {useSelector} from "react-redux";
import {useEffect} from "react";

import * as bootstrap from 'bootstrap'

function Toasts() {
    const messages = useSelector(state => state.messages.list);

    useEffect(() => {
        const toasts = document.querySelectorAll('.toast');
        let container = document.querySelector('.toast-container');
        container.style.display = '';
        if (toasts.length > 0) {
            container.style.display = 'block';
            toasts.forEach(toastEl => {
                const toast = new bootstrap.Toast(toastEl, {autohide: true});
                toast.show();
            });
        }
    }, [messages]);

    return (
        <div className="toast-container">
            {
                messages.map(msg => (
                    <div className="toast" key={msg.message}>
                        <div className="toast-body">
                            {msg.message}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Toasts;
