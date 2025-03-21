import express from 'express';

import bodyParser from 'body-parser';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
require('dotenv').config();

let app = express();
//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

configViewEngine(app);
initWebRoutes(app);
let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log("Backend server is running on the port : " + "http:localhost:" + port);
  
})

