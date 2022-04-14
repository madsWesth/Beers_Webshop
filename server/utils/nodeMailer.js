import nodemailer from "nodemailer"

import dotenv from "dotenv"
dotenv.config()


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    service: "Gmail",
    auth: {
        user: "beershopmandatory@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
    },
})

/* test if config is valid
transporter.verify((err, suc) => {
    if(err){
        console.log(err)
    } else {
        console.log("configuration is valid")
        console.log(suc)
    }
})
*/

export const signupGreeting = {
    from : "Beer Shop <beershopmandatory@gmail.com>",
    to: "",
    subject: "Thanks for signing up to Beer Shop",
    text: "Welcome to our shop!"
}

