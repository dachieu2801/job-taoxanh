"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./shared/database/database"));
const index_1 = __importDefault(require("./routes/index"));
const path_1 = __importDefault(require("path"));
const i18n = require("i18n");
// const Home = require ('./views/components/Home.vue');
i18n.configure({
    locales: ["en", "vn"], // Add as many languages as you want
    directory: path_1.default.join(__dirname, "locales"), // Path to store translation files
    defaultLocale: "vn",
    cookie: "lang", // Optional: for storing language in cookies
    autoReload: true, // Automatically reload translation files if changed
    syncFiles: true, // Sync locale files
});
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT, 10) || 8000;
app.use(i18n.init);
(0, database_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Cấu hình EJS là engine template
app.set("view engine", "ejs");
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.set("views", path_1.default.join(__dirname, "views"));
app.get("/", (req, res) => {
    res.render("index", { title: "Express", message: res.__("gretting") });
});
// Định nghĩa một route
(0, index_1.default)(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
function cookieParser() {
    throw new Error("Function not implemented.");
}
