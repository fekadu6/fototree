const express = require("express");
const cors = require("cors");

const mainRouter = require("./routes/main");

const port = process.env.PORT || 3000;

require("./database/db");

const app = express();

app.use(express.json());

app.use(cors());
//todo: add X-Powered By prottection, ETag, etc...

app.use("/api", mainRouter);

app.listen(port, _ => console.log(`Server is running on port ${port}`));
