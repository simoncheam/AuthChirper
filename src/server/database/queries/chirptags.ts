import { Query } from "../index";
import { Chirps, ChirpsJoined, ChirpTags } from "../../types";


const get_all = (chirpid: number) => Query<ChirpsJoined[]>(
    `SELECT * FROM ChirpTags `[chirpid]);


const create = (tagid: ChirpTags['tagid'], chirpid: ChirpTags['chirpid']) => Query(
    `INSERT INTO ChirpTags SET ? `, [{ tagid, chirpid }]);


const update = (tagid: ChirpTags['tagid'], chirpid: ChirpTags['chirpid']) => Query(
    `UPDATE ChirpTags SET tagid=? WHERE chirpid=? `, [tagid, chirpid]);


const destroy = (chirpid: ChirpTags['chirpid']) => Query("DELETE FROM ChirpTags WHERE chirpid=?", [chirpid]);



export default {
    get_all,
    create,
    destroy,
    update

};