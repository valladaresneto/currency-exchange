import {Request, Response, Router} from "express";
import {param} from 'express-validator';
import {Parser} from 'xml2js';
import axios from "axios";

import {currentUser, requireAuth, validateRequest} from '@valladaresnetoorg/currency-exchange-common';
import {CurrencyEntity, CurrencyOption} from "../models/currency";

class CurrencyRouter {
    public router: Router;
    private currencyApiUrl = 'https://economia.awesomeapi.com.br';
    private currencies: CurrencyOption[] = [];

    constructor() {
        this.routes();
        this.getAvailableCurrencies().then(() => console.log('Currencies loaded.'))
    }

    public availableCurrencies = async (req: Request, res: Response) => {
        await this.getAvailableCurrencies();
        res.status(200).send(this.currencies);
    }

    private async getAvailableCurrencies() {
        if (this.currencies.length === 0) {
            this.currencies = await this.loadAvailableCurrencies();
        }
        return this.currencies;
    }

    private loadAvailableCurrencies() : Promise<CurrencyOption[]> {
        return axios.get(`${this.currencyApiUrl}/xml/available`).then(async res => {
            let parser = new Parser;
            const promise = parser.parseStringPromise(String(res.data));
            const xml = await promise;
            const values = xml.xml
            const currencies: CurrencyOption[] = []
            for (const key of Object.keys(values)) {
                currencies.push(new CurrencyOption({code: key, name: values[key][0]}))
            }
            return currencies;
        });
    }

    public currentValue = async (req: Request, res: Response) => {
        const currenciesForSearch = req.params.currencies;
        const value : CurrencyEntity = await this.getCurrentValue(currenciesForSearch);
        res.status(200).send(value);
    }

    private getCurrentValue(currenciesForSearch: string) : Promise<CurrencyEntity> {
        return axios.get(`${this.currencyApiUrl}/json/last/${currenciesForSearch}`).then(res => res.data).then(res => { return res as CurrencyEntity});
    }

    public historyValues = async (req: Request, res: Response) => {
        const currency = req.params.currency;
        const days = req.params.days;
        const values: CurrencyEntity[] = await this.getHistoryValues(currency, days);
        res.status(200).send(values);
    }

    private getHistoryValues(currency: String, days: String) : Promise<CurrencyEntity[]> {
        return axios.get(`${this.currencyApiUrl}/${currency}/${days}`).then(res => res.data).then(res => { return res as CurrencyEntity[]});
    }

    public routes() {
        this.router = Router();
        this.router.get('/availableCurrencies', this.availableCurrencies);
        this.router.get('/historyValues/:currency/:days', [
                param('currency')
                    .custom(value => {
                        return this.currencies.filter(currency => currency.code === value).length > 0;

                    })
                    .withMessage('The currency must exist and be in XXX-XXX format.'),
                param('days')
                    .isFloat({ min: 2, max: 365 })
                    .withMessage('Number of days must be a number between 2 and 365.')
            ],
            currentUser,
            requireAuth,
            validateRequest,
            this.historyValues
        );
        this.router.get('/currentValue/:currencies', [
                param('currencies')
                    .notEmpty()
                    .custom(value => {
                        value = value.split(',');
                        return !(!Array.isArray(value) || value.length < 1);

                    })
                    .withMessage('At least one currency is required.')
                    .custom(value => {
                        value = value.split(',');
                        for (const val of value) {
                            if (this.currencies.filter(currency => currency.code === val).length === 0) {
                                return false;
                            }
                        }
                        return true;
                    })
                    .withMessage('All currencies must be in XXX-XXX format.')
            ],
            currentUser,
            requireAuth,
            validateRequest,
            this.currentValue
        );
    }
}

export {CurrencyRouter};