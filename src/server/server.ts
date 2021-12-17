import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import routes from './routes';
const app = express();

import {configurePassport} from '../server/middleware/passport-strats.mw'

configurePassport(app); // !import mw function - TS side effect




app.use(express.json());

app.get('/status', (req,res)=> res.sendStatus(200));
app.head('/status', (req,res)=> res.sendStatus(200));

app.use(express.static('public'));
app.use(routes);  /// !!! changes to routes

app.get('*', (req,res) =>{ res.sendFile(path.join(__dirname, '../public/index.html'))});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
