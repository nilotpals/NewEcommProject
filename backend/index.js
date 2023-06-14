const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/User");
const app = express();
app.use(cors());
app.use("/users",userRoute);

app.listen(5000, () =>  {
    console.log("server startted at port 5000");
});