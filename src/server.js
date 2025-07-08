import express from "express";
import connectDB from "./config/connectDB";

import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import cors from "cors";
require("dotenv").config();

let app = express();
app.use(cors({ origin: true }));
//config app

// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

configViewEngine(app);
initWebRoutes(app);

connectDB();
let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(`Backend server is running on the port http://localhost:${port}`);
});
