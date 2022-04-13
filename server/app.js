import dotenv from "dotenv"
import express  from "express";
import helmet from "helmet";
import db from "../server/database/createConnection.js"

//loads the .env file with secrets
dotenv.config()

const app = express()
app.use(helmet())


app.get("", (req, res) => {
    db.
})

const PORT = process.env.PORT || 3000
app.listen(PORT , () => console.log("Server running on port:", PORT))
