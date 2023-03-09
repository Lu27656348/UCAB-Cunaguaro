import express from "express";
import bodyParser from "body-parser";

import cors from 'cors'

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

export default app;