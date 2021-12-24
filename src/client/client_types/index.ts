

export interface MySQL_Default_Response {
    insertId:number;  
    affectedRows: number;
}

export interface Users {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    _created?: string 
}

export interface Chirps {
    id?: number;
    content?: string;
    location?: string;
    userid: number;
    _created?: string;
    
}

export interface CreateChirps {
    content?: string;
    location?: string;
    tagid?: number; 
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
    location?: string;
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
