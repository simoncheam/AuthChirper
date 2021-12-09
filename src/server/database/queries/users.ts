import { Query } from "../index";
import { Users } from "../../types";

const get_all = () => Query<Users[]>("SELECT * FROM Users");

const get_one_by_id = (id: number) => Query<Users[]>("SELECT * FROM Users WHERE id =?", [id]);

const create = (new_user: Users) => Query('INSERT INTO Users SET ?', [new_user]);

const update = (user: Users, id: Users['id']) => Query('UPDATE Users SET ? WHERE id=?', [user, id]);

const destroy = (id: Users['id']) => Query('DELETE FROM Users WHERE id=?', [id]);

const getUserBy = (column_name: string, value: string | number) =>
    Query<Users[]>("SELECT * FROM Users WHERE ??=?", [column_name, value]);


export default {
    get_all,
    get_one_by_id,
    create,
    update,
    destroy,
    getUserBy
};