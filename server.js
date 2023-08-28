
const express = require("express");
const userRouter = require("./userRoutes");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors());
app.use("/users" , userRouter);

app.get("/", (req , res) => {
    res.send("Hello");
});

//mongoose setup
const PORT = 8081;

//app.listen(PORT , () => console.log(`Server Port: ${PORT}`));

mongoose.connect('mongodb+srv://pixer11:narutouzumaki@cluster0.ryym8bj.mongodb.net/?retryWrites=true&w=majority' , {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then( () => {
    app.listen(PORT , () => console.log(`Server Port: ${PORT}`));
    console.log("db connected")

})
.catch((error) => console.log(`${error} did not connect`));