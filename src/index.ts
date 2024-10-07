import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./shared/database/database";
import route from "./routes/index";
import fs from "fs";
import path from "path";
import i18next from "i18next";
import Backend from "i18next-node-fs-backend";
import i18nextMiddleware from "i18next-http-middleware";

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    lng: "vi",
    backend: {
      loadPath: path.join(__dirname, "../locales/{{lng}}/{{ns}}.json"),
    },
    fallbackLng: "vi",
    preload: ["vi", "en"],

    load: "languageOnly",
  });

dotenv.config();
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 8000;

app.use(i18nextMiddleware.handle(i18next));
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use((req: Request, res: Response, next) => {
  // Set default language to Vietnamese
  req.i18n.changeLanguage("vi");
  next();
});

// Cấu hình EJS là engine template
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "views"));
app.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "APPLE GREEN", t: req.t.bind(req.i18n) });
});

app.get("/admin", (req: Request, res: Response) => {
  const greeting = req.t("greeting");
  console.log(greeting);
  res.render("admin/home", { title: "Express", t: req.t.bind(req.i18n) });
});

// Định nghĩa một route
route(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
