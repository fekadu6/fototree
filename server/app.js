const express = require("express");
const cors = require("cors");

const mainRouter = require("./routes/main");
const photoRouter = require("./routes/photo");
const uploadRouter = require("./routes/upload");


const port = process.env.PORT || 3000;

require("./database/db");

const app = express();

app.use(express.json());

app.use(cors());
//todo: add X-Powered By prottection, ETag, etc...

app.use("/api", mainRouter);
app.use("/api", photoRouter);
app.use("/upload",uploadRouter);

app.listen(port, _ => console.log(`Server is running on port ${port}`));
