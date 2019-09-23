const express = require("express");
const cors = require("cors");

const mainRouter = require("./routes/main");
const photoRouter = require("./routes/photo");

const port = process.env.PORT || 3000;

require("./database/db");

const app = express();

app.use(express.json());

app.use(cors());
//todo: add X-Powered By prottection, ETag, etc...

app.use("/fototree-api", mainRouter);
app.use("/fototree-api", photoRouter);

app.listen(port, _ => console.log(`Server is running on port ${port}`));
