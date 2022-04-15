import { Router } from "express"
import db from "../database/createConnection.js"
import { transporter, signupGreeting } from "../utils/nodeMailer.js"
import bcrypt from "bcrypt"
//bcrypt saltrounds
const saltrounds = 12

const router = Router()

router.post("/signup", async (req, res) => {
    try{
        const { creationEmail, creationPassword } = req.body

        //check for missing data
        if(!creationEmail) {
            throw "MissingEmail"
        }

        if(!creationPassword) {
            throw "MissingPassword"
        }

        //first check if the email already exists
        const userExists =  await db.get("SELECT * FROM users WHERE email= $email", {
            $email: creationEmail
        })

        //no user with email that is trying to be signed up
        if(userExists){
            throw "UserExists"
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
        if(passwordValidationRegex.test(creationPassword)){
            const hashed_password = await bcrypt.hash(creationPassword, saltrounds)
            
            await db.run("INSERT INTO users (email, hashed_password) VALUES ($email, $password)", {
                $email : creationEmail,
                $password : hashed_password
            })
        } else {
            throw "InvalidPassword"
        }

        res.send({message: "Successfully signed up"})

        //thanks for signing up email
        const mailMessage = signupGreeting
        mailMessage.to = creationEmail
        console.log(mailMessage, "mail to send, currently disabled during development")
        //transporter.sendMail(mailMessage)

    } catch (error) {
        console.log(error)

        //TODO: switch case
        if(error === "UserExists"){
            res.status(400).send({
                error: "UserExists"
            })
        } else if(error === "InvalidPassword"){
            res.status(400).send({
                error: "InvalidPassword"
            })
        } else if(error === "MissingEmail"){
            res.status(400).send({
                error: "MissingEmail"
            })
        } else if(error === "MissingPassword"){
            res.status(400).send({
                error: "MissingPassword"
            })
        } else {
            console.log("lol")
            res.status(500).send({})
        }
        
    }
})

router.post("/login", async (req, res) => {
    //gets hashed password from db
    const { id, hashed_password } = await db.get("SELECT id, hashed_password FROM users where email=$email", {
        $email: req.body.email
    })
    //compares input password with hashed from database
    const isCorrectPassword = await bcrypt.compare(req.body.password, hashed_password)

    if(isCorrectPassword){
        req.session.isLoggedIn = true
        req.session.userId = id

        res.send({isLoggedIn: true})
    } else {
        //stuff to do if login is unsuccessful maybe this should be a try/catch?
        res.send({error: "incorrectPassword"})
    }
})

router.post("/logout", (req, res) => {
    req.session.destroy()
    res.send({isLoggedIn: false})
})
export default router
