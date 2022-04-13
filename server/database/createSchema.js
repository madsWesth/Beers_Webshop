import db from "./createConnection.js"

const isInDeleteMode = true


if(isInDeleteMode){
    db.exec(`
        DROP TABLE IF EXISTS USERS
    `)
}

db.exec(`
    CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(50) NOT NULL,
    hashed_password VARCHAR(70) NOT NULL UNIQUE)`
)

db.exec(`
    INSERT INTO users VALUES (null ,'test@mail.com', 'adfsklj234ioh234jkh23kjtest')
`)

db.all("SELECT * FROM users").then(data => console.log(data))