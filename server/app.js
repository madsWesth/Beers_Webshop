import db from "../server/database/createConnection.js"
import rateLimit from "express-rate-limit"

//loads the .env file with secrets
import dotenv from "dotenv"
dotenv.config()

import express  from "express"
const app = express()
app.use(express.json())

import cors from "cors"
app.use(cors({
	origin: "http://localhost:8080",
	credentials: true,
}))

//session for auth
import session from "express-session";
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	rolling: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		maxAge: 10 * 60 * 1000,
		secure: false
	}
}))

//adds security headers
import helmet from "helmet";
app.use(helmet())

//limits request in a 15 min time window
const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use("/auth", authLimiter)

import accountRouter from "./routers/accountRouter.js"
app.use("/auth", accountRouter)

app.get("/beers", async (req, res) => {
    const result = await db.all("SELECT * FROM beers")
	console.log(req.session.isLoggedIn)
	console.log(req.sessionID)
    res.send(result)
})

const PORT = process.env.PORT || 3000
app.listen(PORT , () => console.log("Server running on port:", PORT))
