const express = require("express");
const PORT = 5000;

const app = express();
const postmanRoutes = require("./routes/postmanRoutes");
app.use("*", postmanRoutes);
app.listen(PORT, () => {
  console.log("backend is running at port ", PORT);
});
