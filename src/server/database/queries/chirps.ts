import { Query } from "../index";
import { MysqlResponse } from "../models";
import { Chirps, ChirpsJoined } from "../../types"


const create = (new_chirp: Chirps) => {
    return Query(`INSERT INTO Chirps SET ?`, [new_chirp]);
}


const get_all = () => Query<ChirpsJoined[]>
    (`SELECT * FROM Chirps`);


const get_one_by_id = (id:number)=>Query<[ChirpsJoined[], MysqlResponse]>
(`CALL spGetChirpById(?) `,[id]);


const get_all_by_tagid = (id:number)=>Query<ChirpsJoined[]>
(`CALL spGetChirpsByTagId(?) `,[id]);


const get_all_by_authorid = (id:number)=>Query<ChirpsJoined[]>
(`CALL spGetChirpsByUserId(?) `,[id]);


const update = (chirp: Chirps, id: Chirps['id'], userid: number) => Query("UPDATE Chirps SET ? WHERE id=? AND userid =?", [chirp, id, userid]);


const destroy = (id: Chirps['id'], userid: number) => Query("DELETE FROM Chirps WHERE id=? and userid=?", [id, userid]);


export default {
    get_all,
    get_one_by_id,
    create,
    update,
    destroy

};