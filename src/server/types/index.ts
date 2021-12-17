import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import {UsersTable} from '../database/models';


export interface ReqUser extends Request {
    user?: Users ;
}

export interface Users {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    _created?: string 
}



export interface TokenUser extends Users {
    pizza?: 'Hawaiian';
    userid?: number; //this works
    id?: number //trying this??
}

export interface Payload extends UsersTable {
    id?: number;
    role?:number;
}

export interface MySQL_Default_Response {
    insertId:number;  
    affectedRows: number;
}


export interface Chirps {
    id?: number;
    title?: string;
    content?: string;
    location?: string;
    userid: number;
    _created?: string;
    
}

export interface Tags {
    id?: number;
    name: string;
    _created?: string 
}

export interface ChirpTags {
    chirpid: Chirps["id"];
    tagid: number   
}


export interface ChirpsJoined {
    id?: number;
    tag_id: number;
    tag_name: string;
    chirp_id: number;
    title: string;
    content: string,
    chirp_created: string;
    u_name: string;
    u_email: string;
    u_id?: number;
    _created?: string;
}
