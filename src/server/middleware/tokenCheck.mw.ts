import * as passport from 'passport';
import {Request, Response, NextFunction} from 'express';
import {ReqUser} from '../types';

export function tokenCheck(req: ReqUser, res: Response, next: NextFunction) {

    console.log('TOKEN CHECK...');
    passport.authenticate('jwt', (err, user, info) => {

        if (err) {
            return next(err)
        }

        if (info){
            return res.status(401).json({
                message: 'Error while authenticating, please log in again',
                error: info.message
            });
        }

        if(!user) {

            return res.redirect('/login')

        }

        if(user) {

            console.log('Token is good!');
            req.user = user;
            delete req.user.password;
        }
        next();

    })(req, res, next)  // Q: we may need to review this...

};