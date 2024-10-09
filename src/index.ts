import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./shared/database/database";
import route from "./routes/index";
import path from "path";
import i18nConfig from "./shared/i18n/i18n";  // Import the new i18n configuration
import i18nextMiddleware from "i18next-http-middleware";

dotenv.config();
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 8000;

// khởi tạo i18n
const i18next = i18nConfig();
app.use(i18nextMiddleware.handle(i18next));

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use((req: Request, res: Response, next) => {
  req.i18n.changeLanguage("vi");
  next();
});

// Cấu hình EJS là engine template
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "views"));

// Định nghĩa một route
route(app);

app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
