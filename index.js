const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || "8000";
app.use(express.static(path.join(__dirname, "src/views")));
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");
app.get("/", (req, res) => {
    res.render("index", { title: "MAZE BANK HACK SOLVER" });
});
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});