const express = require("express");
const app = express();
const port = 3030;

const errorsHandler = require("./middleware/errorsHandler.js");

const notFound = require("./middleware/notFound.js");

const postsRouter = require("./routes/posts.js");

app.use(express.static("imgs"));

//body-parser
app.use(express.json());

/*
app.get("/", (req, res) => {
  res.send("Hello marzia");
});
*/

app.use("/posts", postsRouter);

app.use(errorsHandler);

app.use(notFound);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost${port}`);
});
