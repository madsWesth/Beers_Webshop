import db from "./createConnection.js"

const isInDeleteMode = true


if(isInDeleteMode){
    db.exec(`
        DROP TABLE IF EXISTS users
    `)
}

db.exec(`
    CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    hashed_password VARCHAR(70) NOT NULL UNIQUE)`
)


//test
//inserted password is the hash of abc for testing
db.exec(`
    INSERT INTO users VALUES (null ,'test@mail.com', '$2b$12$xhJa/H82iJyY8E14yYyTz.Iy.QYdPhhsGSm1qAJHlVtR1MDMLBMBW')
`)

db.all("SELECT * FROM users").then(data => console.log(data))