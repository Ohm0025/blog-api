const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/router");
const morgan = require("morgan");
const { notFound, apiError } = require("./utils/apiError");

dotenv.config({ path: ".env" });

const port = process.env.PORT || 8080;
const node_env = process.env.NODE_ENV || "dev";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(node_env));

app.get("/testConnectApi", (req, res) => {
  res.status(200).json({ message: "connect api complete" });
});
app.use("/", router);

app.all("*", notFound);
app.use(apiError);

app.listen(port, () => console.log(`server is running on ${port}`));
