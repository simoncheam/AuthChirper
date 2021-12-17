import * as jwt from 'jsonwebtoken'
import * as passport from 'passport';
import config from '../../config';
import usersDB from '../../database/queries/users';
import { Router } from 'express';
import { ReqUser} from '../../types'

const router = Router();

router.post('/', passport.authenticate('local'), async ( req: ReqUser, res) => {

    
    try {
        
        //jwt requires object with all items for token
        
        const token = jwt.sign(
            { id: req.user.id, email: req.user.email, pizza: 'Hawaiian'},
            config.jwt_config.secret,
            {expiresIn: config.jwt_config.expiration}
            );
            
        console.log('--- INSIDE LOGIN.TS POST ROUTE!');
        
        console.log(`token : ${token}`);

        res.status(200).json({message: "successful login!", token});

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: " login broke!", error})
    }

});

export default router;