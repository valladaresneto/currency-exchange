import express, {Application} from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AuthRouter } from './routers/auth-router';
import createConnection from './dbconfig/dbconnector';
import cors from 'cors';
import {NotFoundError} from "./errors/not-found-error";
import { errorHandler } from './middlewares/error-handler';

class Server {
    private readonly version : Number;
    private readonly app : Application;
    private userRouter: AuthRouter

    constructor() {
        if (!process.env.JWT_KEY) {
            throw new Error('JWT_KEY must be defined');
        }

        this.app = express();
        this.app.set('trust proxy', true);
        this.version = parseInt(process.env.version!);
        this.config();
        this.userRouter = new AuthRouter();
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
        this.app.use(`/api/v${this.version}/user`, this.userRouter.router);

        this.app.all('*', async (req, res) => {
            throw new NotFoundError();
        });

        this.app.use(errorHandler);
    }

    public async start() {
        const port = 3000;
        await this.createDb();
        this.app.listen(port, () => {
            console.log(`Server is listening on port ${port}.`)
        });
    }

    public async createDb() {
        await createConnection();
    }

    public getApp() {
        return this.app;
    }
}

const server = new Server();
export { server };