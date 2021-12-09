import { Query } from "../index";
import { Tags } from "../../types";

const get_all = () => Query<Tags[]>(
    `SELECT name, id, _created FROM Tags `);

const create = (new_tag: Tags) => Query(
    `INSERT INTO Tags SET ? `, [new_tag]);


const destroy = (id: Tags['id']) => Query(
    `DELETE FROM Tags WHERE id=?`, [id]);

export default {
    get_all,
    create,
    destroy
};