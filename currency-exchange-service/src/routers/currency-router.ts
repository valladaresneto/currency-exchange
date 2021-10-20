import {Request, Response, Router} from "express";
import {param} from 'express-validator';
import axios from "axios";

import {validateRequest, requireAuth, currentUser} from '@valladaresnetoorg/currency-exchange-common';
import {CurrencyEntity} from "../models/currency";

class CurrencyRouter {
    public router: Router;
    private currencyApiUrl = 'https://economia.awesomeapi.com.br';
    private currencies = ['USD-BRL','EUR-BRL','GBP-BRL','CHF-BRL','DKK-BRL','UYU-BRL','NZD-BRL','CAD-BRL','BTC-BRL','ETH-BRL'];

    constructor() {
        this.routes();
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
        this.router.get('/historyValues/:currency/:days', [
                param('currency')
                    .custom(value => {
                        return this.currencies.indexOf(value) !== -1;

                    })
                    .withMessage('The currency must exist and be in XXX-XXX format.'),
                param('days')
                    .isFloat({ min: 2, max: 365 })
                    .withMessage('Number of days must be a number between 2 and 365.')
            ],
            currentUser,
            // requireAuth,
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
                            if (this.currencies.indexOf(val) === -1) {
                                return false;
                            }
                        }
                        return true;
                    })
                    .withMessage('All currencies must be in XXX-XXX format.')
            ],
            currentUser,
            // requireAuth,
            validateRequest,
            this.currentValue
        );
    }
}

export {CurrencyRouter};