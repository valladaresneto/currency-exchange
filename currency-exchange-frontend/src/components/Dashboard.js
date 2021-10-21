import './Dashboard.scss';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {addToastMessages} from "../redux/actions";

function Dashboard() {
    const [currency, setCurrency] = useState('');
    const [currencies, setCurrencies] = useState(['USD-BRL', 'EUR-BRL', 'GBP-BRL', 'CHF-BRL', 'DKK-BRL', 'UYU-BRL', 'NZD-BRL', 'CAD-BRL', 'BTC-BRL', 'ETH-BRL']);
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [currenciesValues, setCurrenciesValues] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const loadCurrenciesOptions = async () => {
            try {
                const response = await axios.get('/api/v1/currency/availableCurrencies');
                setCurrencyOptions(response.data);
            } catch (error) {
                dispatch(addToastMessages(error.response.data.errors));
            }
        };
        loadCurrenciesOptions().then(() => true)
    }, [dispatch])

    useEffect(() => {
        const loadValues = async () => {
            try {
                const response = await axios.get(`/api/v1/currency/currentValue/${currencies.join(',')}`);
                const values = [];
                for (let key of Object.keys(response.data)) {
                    values.push(response.data[key]);
                }
                setCurrenciesValues(values);
            } catch (error) {
                dispatch(addToastMessages(error.response.data.errors));
            }
        };
        loadValues().then(() => true);
        // setInterval(() => loadValues().then(() => true), 1000);
    }, [currencies, dispatch])


    const addCurrency = async (event) => {
        event.preventDefault();

        const currentValues = [...currencies];
        if (!currentValues.includes(currency)) {
            currentValues.push(currency);
        }
        setCurrencies(currentValues);
        setCurrency('');
    };

    return (
        <div className="dashboard">
            <form className="w-100 d-flex flex-column">
                <div className="row mb-4">
                    <h5 className="text-start col-sm-12 col-md-6 col-lg-8">
                        Dashboard
                    </h5>
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <div className="input-group">
                            <select className="form-control currency-input"
                                   onChange={(e) => setCurrency(e.target.value)}
                                   value={currency}>
                                <option value=''>Select one currency</option>
                                {
                                    currencyOptions.map(value => (
                                        <option key={value.code} value={value.code}>{value.name}</option>
                                    ))
                                }

                            </select>

                            <button className="btn btn-lg btn-primary text-nowrap" onClick={addCurrency}>
                                Add Currency
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        currenciesValues.map(value => (
                            <div key={value.code} className="col-md-12 col-lg-6 col-xl-4">
                                <div className="card flex-md-row mb-4">
                                    <div className="card-body d-flex flex-column align-items-start">
                                        <strong className="d-inline-block mb-2 text-primary">{value.name}</strong>
                                        <div className="d-flex justify-content-between w-100">
                                            <div className="d-flex flex-column align-items-start">
                                                <h3 className="mb-0">
                                                    {value.code} - {value.codein}
                                                </h3>
                                                <div className="mb-1 text-muted">{value.create_date}</div>
                                            </div>
                                            <div className="d-flex flex-column align-items-end">
                                                <span><b>Buy:</b> {value.ask}</span>
                                                <span><b>Sell:</b> {value.bid}</span>
                                                <span><b>Lowest:</b> {value.low}</span>
                                                <span><b>Highest:</b> {value.high}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </form>
        </div>
    );

}

export default Dashboard;
