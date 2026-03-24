require("dotenv").config()
const connectToDB=require("./src/config/db.js")

const app=require("./src/app")

const PORT=3000
connectToDB()
.then(()=>{
    console.log("Connected to Database");
})
.catch((err)=>{
    console.log("Error in connecting to DB")
})

app.listen(3000,()=>{
    console.log(`Server is listening to PORT : ${PORT}`)
})
