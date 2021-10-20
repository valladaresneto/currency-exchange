import express, {Application} from 'express';
import 'express-async-errors'
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { CurrencyRouter } from './routers/currency-router';
import cors from 'cors';

import {NotFoundError, errorHandler} from '@valladaresnetoorg/currency-exchange-common';

class Server {
    private readonly version : Number;
    private readonly app : Application;
    private currencyRouter: CurrencyRouter

    constructor() {
        if (!process.env.JWT_KEY) {
            throw new Error('JWT_KEY must be defined');
        }

        this.app = express();
        this.app.set('trust proxy', true);
        this.version = parseInt(process.env.version!);
        this.config();
        this.currencyRouter = new CurrencyRouter();
        this.routerConfig();
    }

    private config() {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(
            cookieSession({
                signed: false,
                secure: false
            })
        );
    }

    private routerConfig() {
        this.app.use(`/api/v${this.version}/currency`, this.currencyRouter.router);

        this.app.all('*', () => {
            throw new NotFoundError();
        });

        this.app.use(errorHandler);
    }

    public async start() {
        const port = 3000;
        this.app.listen(port, () => {
            console.log(`Server is listening on port ${port}.`)
        });
    }


    public getApp() {
        return this.app;
    }
}

const server = new Server();
export { server };