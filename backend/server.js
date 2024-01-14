const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

const IndexRoute = require("./Routers/index")
const connectDatabase = require("./helpers/database/connectDatabase")
const customErrorHandler = require("./middlewares/Errors/customErrorHandler")

dotenv.config()

connectDatabase()

const app = express() ;

app.use(express.json())
app.use(cors())

app.use("/",IndexRoute)

app.use(customErrorHandler)

const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname , "public") ))

const server = app.listen(PORT,()=>{

    console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`)

})

process.on("unhandledRejection",(err , promise) =>{
    console.log(`Logged Error : ${err}`)

    server.close(()=>process.exit(1))
})