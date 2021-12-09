import { Router } from 'express';
import {tokenCheck} from '../../middleware/tokenCheck.mw'
import { ReqUser } from '../../types';
import usersDB from '../../database/queries/users';

const router = Router();

router.get('/', tokenCheck, async (req: ReqUser, res) => {

    const id = req.user.id;
    console.log(Number(id));

    try {
        
        console.log('validate.ts - try block');

        const [one_user] = await usersDB.get_one_by_id(Number(id));
        delete one_user.password;

        if (!one_user) {
            res.status(404).json({ message: "User not found!" })
            
        } else {

            return res.status(200).json({message: `welcome ${one_user.name}!`, one_user})
            
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'A server errors occurred', error: error.sqlMessage });
        
    }


})

export default router;
