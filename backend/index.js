import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router/user.router.js";
import { connectToDB } from "./config/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);
connectToDB();

app.listen(3000, () => {
  console.log(`listening on 3000`);
});
