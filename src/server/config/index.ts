import * as dotenv from 'dotenv';
dotenv.config();
export const database_config = {   // we do this to hide secure info
   database: process.env.DB_NAME,
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD
};
