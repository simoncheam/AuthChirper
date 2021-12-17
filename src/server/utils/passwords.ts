import * as bcrypt from 'bcrypt';

export function generateHash(password: string){

    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt)
    // const hash = bcrypt.hashSync(password, 12)  ; //alternative method
    
    return hash;
}

export function compareHash(password: string, hashed: string){
    return bcrypt.compareSync(password, hashed);
}