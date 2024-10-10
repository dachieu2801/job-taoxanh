import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./shared/database/database";
import route from "./routes/index";
import path from "path";
import i18nConfig from "./shared/i18n/i18n";
import i18nextMiddleware from "i18next-http-middleware";
import multer from "multer";
import Tesseract from "tesseract.js";
import expressLayouts from "express-ejs-layouts";

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

// Cấu hình multer để upload hình ảnh
const storage = multer.memoryStorage(); // Sử dụng bộ nhớ thay vì lưu trữ vào đĩa
const upload = multer({ storage: storage }).single("image");

// Cấu hình EJS là engine template
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/main");
// app.engine("ejs", ejsLocals);
app.use(express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "views"));
// app.set("layout", "layout");

//route
route(app);

// Route để xử lý upload hình ảnh và OCR
app.post("/upload-imeis", (req: Request, res: Response) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(422).json({
        status: "failed",
        message: "Error: An error occurred while uploading the file.",
      });
    }

    if (!req.file) {
      return res.status(422).json({
        status: "failed",
        message: "Error: No file selected.",
      });
    }

    Tesseract.recognize(req.file.buffer, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        const regex = /IMEI\d*\s+((?:\d+\s*){15})/g;

        let matches;
        const imeis = [];

        while ((matches = regex.exec(text)) !== null) {
          const numbers = matches[1].trim().split(/\s+/);
          const concatenatedNumbers = numbers.join("");
          if (concatenatedNumbers.length === 15) {
            imeis.push(concatenatedNumbers);
          }
        }
        return res.status(200).json({
          status: "success",
          data: imeis,
        });
      })
      .catch((error) => {
        return res.status(422).json({
          status: "failed",
          message: "Error processing image.",
        });
      });
  });
});

app.get("/error", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Simulated server error!");
  next(error);
});

app.use((req: Request, res: Response) => {
  res.status(404).render("404", { title: "Page Not Found", layout: false });
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack (optional)
  res
    .status(500)
    .render("500", { title: "Internal Server Error", layout: false });
});

app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
