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

        // !!! add in edge case check where user may not exist
        if(!user) {

            return res.redirect('/login')

        }


        if(user) {

            delete user.password;
            console.log('INSIDE TOKENCHECK if(user) block:');
            console.log(`user.userid: ${user.userid}`);
            
            console.log(`user.id: ${user.id}`);
            
            console.log('Token is good!');
            req.user = user;
        }
        next();

    })(req, res, next)  //passing into passport authenticate

};