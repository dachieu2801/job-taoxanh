import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./shared/database/database";
import route from "./routes/index";
import fs from "fs";
import path from "path";
// const Home = require ('./views/components/Home.vue');

dotenv.config();
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 8000;

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Cấu hình EJS là engine template
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "views"));
app.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Express", message: "dmm" });
});

// Định nghĩa một route
route(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
