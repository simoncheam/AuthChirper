import * as jwt from 'jsonwebtoken';
import config, { jwt_config} from '../../config';
import usersDB from '../../database/queries/users';
import {Router} from 'express';
import { generateHash} from '../../utils/passwords'

const router = Router();

router.post('/', async (req, res) => {

        const newUser = req.body;

        try {
            
            // create new hash
            newUser.password = generateHash(newUser.password);

            //insert new user into db
            const result = await usersDB.create(newUser);
            result.insertId  // Q: why? A:

            console.log(result);

            //create new token
            const token = jwt.sign(

                {userid: result.insertId, email: newUser.email},
                config.jwt_config.secret,
                {expiresIn: jwt_config.expiration}
            );

            res.status(200).json({message: 'successful registration', token});

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error occurred during registration', error})
            
        }

})

export default router;