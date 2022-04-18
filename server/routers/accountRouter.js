import { Router } from "express"
import db from "../database/createConnection.js"
import { transporter, signupGreeting } from "../utils/nodeMailer.js"
import bcrypt from "bcrypt"
//bcrypt saltrounds
const saltrounds = 12

const router = Router()

router.post("/signup", async (req, res) => {
    try {
        //check for missing data
        if (!req.body.email) {
            throw "noEmail"
        }

        if (!req.body.password) {
            throw "noPassword"
        }

        //first check if the email already exists
        const userExists = await db.get("SELECT * FROM users WHERE email= $email", {
            $email: req.body.email
        })

        //no user with email that is trying to be signed up
        if (userExists) {
            throw "userExists"
        }

        //password validation; min length, lower and upper case, numbers, symbols
        //regex:
        //https://www.linkedin.com/pulse/create-strong-password-validation-regex-javascript-mitanshu-kumar
        //regex from source above:
        // /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/
        //or maybe a package:
        //https://www.npmjs.com/package/express-validator
        //https://www.npmjs.com/package/validator
        //https://www.npmjs.com/package/password-validator

        const passwordValidationRegex =
            /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/

        //password passes validation test
        if (passwordValidationRegex.test(req.body.password)) {
            const hashed_password = await bcrypt.hash(req.body.password, saltrounds)

            await db.run("INSERT INTO users (email, hashed_password) VALUES ($email, $password)", {
                $email: req.body.email,
                $password: hashed_password
            })
        } else {
            throw "invalidPassword"
        }

        res.send({ msg: "signupSuccess" })

        //thanks for signing up email
        const mailMessage = signupGreeting
        mailMessage.to = req.body.creationEmail
        console.log(mailMessage, "mail to send, currently disabled during development")
        //TODO: transporter.sendMail(mailMessage)

    } catch (error) {
        //user error
        if (error === "noEmail") {
            res.status(400).send({
                msg: "noEmail"
            })
        } else if (error === "noPassword") {
            res.status(400).send({
                msg: "noPassword"
            })
        } else if (error === "userExists") {
            res.status(400).send({
                msg: "userExists"
            })
        } else if (error === "invalidPassword") {
            res.status(400).send({
                msg: "invalidPassword"
            })
            //server error
        } else {
            res.status(500).send({})
        }

    }
})

router.post("/login", async (req, res) => {
    try {
        if (!req.body.email) {
            throw "noEmail"
        }

        if(!req.body.password){
            throw "noPassword"
        }
        //gets hashed password from db
        const result = await db.get("SELECT id, hashed_password FROM users where email=$email", {
            $email: req.body.email
        })

        if(!result){
            throw "badEmail"
        }

        //compares input password with hashed from database
        const isCorrectPassword = await bcrypt.compare(req.body.password, result.hashed_password)

        if (isCorrectPassword) {
            req.session.isLoggedIn = true
            req.session.userId = result.id

            res.status(200).send({ isLoggedIn: true })
        } else {
            //stuff to do if login is unsuccessful maybe this should be a try/catch?
            throw "incorrectPassword"
        }
    } catch (error) {
        switch (error) {
            case "noEmail":
                return res.status(400).send({msg: "noEmail"})
            case "badEmail":
                return res.status(400).send({msg: "badEmail"})
            case "noPassword":
                return res.status(400).send({msg: "noPassword"})
            case "incorrectPassword":
                return res.status(400).send({ msg: "incorrectPassword" })

            default:
                return res.status(500).send({})
        }
    }
})

router.post("/logout", (req, res) => {
    req.session.destroy()
    res.send({ isLoggedIn: false })
})
export default router
