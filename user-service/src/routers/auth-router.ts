import {Request, Response, Router} from "express";
import {body} from 'express-validator';
import jwt from 'jsonwebtoken';

import {Password} from '../utils/password';
import {UserService} from '../services/user-service';
import {UserEntity} from "../models/user";

import {validateRequest, BadRequestError} from '@valladaresnetoorg/currency-exchange-common';

declare module 'express-session' {
    interface SessionData {
        jwt?: string
    }
}

class AuthRouter {
    public router: Router;
    private userService: UserService;

    constructor() {this.router = Router();
        this.userService = new UserService();
        this.routes();
    }

    public signup = async (req: Request, res: Response) => {
        const {email, password, confirmPassword} = req.body;

        if (password !== confirmPassword) {
            throw new BadRequestError("Passwords don't match.");
        }

        let user = new UserEntity();
        user.email = email;
        const existingUser = await this.userService.getOne(user);

        if (existingUser) {
            throw new BadRequestError('Email already in use');
        }

        user.password = await Password.toHash(password);
        user = await this.userService.create(user);

        req.session!.jwt = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_KEY!
        );

        user.password = '';
        res.status(201).send(user);
    }

    public signin = async (req: Request, res: Response) => {
        const {email, password} = req.body;

        const user = new UserEntity();
        user.email = email;
        const existingUser = await this.userService.getOne(user);

        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }

        const passwordsMatch = await Password.compare(
            existingUser.password,
            password
        );
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid Credentials');
        }

        req.session!.jwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email
            },
            process.env.JWT_KEY!
        );

        existingUser.password = '';
        res.status(200).send(existingUser);
    }

    public signout = (req: Request, res: Response) => {
        delete req.session!.jwt;
        res.send({});
    }

    public routes() {
        this.router.post('/signup', [
                body('email')
                    .isEmail()
                    .withMessage('Email must be valid'),
                body('password')
                    .trim()
                    .isLength({min: 4, max: 20})
                    .withMessage('Password must be between 4 and 20 characters')
            ],
            validateRequest,
            this.signup
        );
        this.router.post('/signin', [
                body('email')
                    .isEmail()
                    .withMessage('Email must be valid'),
                body('password')
                    .trim()
                    .notEmpty()
                    .withMessage('You must supply a password')
            ],
            validateRequest,
            this.signin
        );
        this.router.get('/signout', this.signout);
    }
}

export {AuthRouter};