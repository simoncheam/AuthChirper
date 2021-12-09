
//!!! Add token check


import * as express from 'express';
import { Users } from '../../types'
import usersDB from '../../database/queries/users';
import { ReqUser } from '../../types';

// import { tokenCheck } from '../../middlewares/tokenCheck.mw';


const router = express.Router();

// router.route('*')
//     .post(tokenCheck)
//     .put(tokenCheck)



router.get('/', async (req, res) => {

    try {
        const all_users = await usersDB.get_all();

        all_users.forEach(u => {
            delete u.password;
        }
        )

        res.status(200).json(all_users)

    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

})



router.get('/:user_id', async (req: ReqUser, res) => {


    const id = req.params.user_id;
    console.log('GET user by ID!');


    try {

        const [one_user] = await usersDB.get_one_by_id(Number(id));

        if (!one_user) {
            res.status(404).json({ message: "User not found!" })

        } else {

            delete one_user.password;
            console.log(one_user);

            res.status(200).json({ message: `User Found! `, one_user });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });


    }

})


router.post('/', async (req, res) => {

    const { name, email, password }: Users = req.body;

    if (!name || !email || !password) {  // input validation
        return res.status(400).json({ message: "Fill out everything!" })
    }

    try {

        const userResults = await usersDB.create({ name, email, password })
        res.status(201).json({ message: "User created", id: userResults.insertId });

    } catch (error) {
        res.status(500).json({ message: " A server error occurred", error: error.sqlMessage });
    }

});




router.put('/:id', async (req, res) => {

    const id = Number(req.params.id);

    const { name, email, password }: Users = req.body;

    if (!name || !email) {  // input validation
        return res.status(400).json({ message: "Fill out everything!" })
    }

    try {
        const userResults = await usersDB.update({ id, name, email, password }, id)
        res.status(201).json({ message: "Chirp updated", id: userResults.insertId });


    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
});



router.delete('/:id', async (req, res) => {

    const id = Number(req.params.id);

    try {
        await usersDB.destroy(id);
        res.status(200).json({ message: "Deleted User!" });
    } catch (error) {
        res.status(500).json({ message: "A server error occurred", error: error.sqlMessage });
    }
});

export default router;
