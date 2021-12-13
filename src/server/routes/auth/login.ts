import * as jwt from 'jsonwebtoken'
import * as passport from 'passport';
import config from '../../config';
import usersDB from '../../database/queries/users';
import { Router } from 'express';
import { ReqUser} from '../../types'

const router = Router();

router.post('/', passport.authenticate('local'), async ( req: ReqUser, res) => {

console.log('INSIDE LOGIN ROUTE!');

    try {

        //jwt requires object with all items for token
        
        const token = jwt.sign(
            { userid: req.user.id, email: req.user.email},
            config.jwt_config.secret,
            {expiresIn: config.jwt_config.expiration}
        );
        
        console.log(token);

        res.status(200).json({message: "successful login!", token});

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: " login broke!", error})
    }

});

export default router;