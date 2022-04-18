import db from "./createConnection.js"

const isInDeleteMode = true


if (isInDeleteMode) {
    db.exec(`
        DROP TABLE IF EXISTS users`
    )
    db.exec(`
        DROP TABLE IF EXISTS beers`
    )
}

db.exec(`
    CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    hashed_password VARCHAR(70) NOT NULL UNIQUE)`
)

db.exec(`
    CREATE TABLE beers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    price INTEGER NOT NULL,
    tagline VARCHAR(200),
    description VARCHAR(700),
    image_url VARCHAR(200))`
)

//50 dummy beers from https://punkapi.com/
import fetchBeers from "../utils/fetchDummyBeers.js"
const dummyBeers = await fetchBeers()
dummyBeers.forEach(beer => {
    db.run(`
        INSERT INTO beers VALUES (null, $name, $price, $tagline, $description, $image_url)`, {
        $name: beer.name,
        $price: Math.floor(Math.random() * 35 + 15),
        $tagline: beer.tagline,
        $description: beer.description,
        $image_url: beer.image_url
    })
})


//inserted password is the hash of abc for testing
db.exec(`
    INSERT INTO users VALUES (null ,'test@mail.com',
    '$2b$12$xhJa/H82iJyY8E14yYyTz.Iy.QYdPhhsGSm1qAJHlVtR1MDMLBMBW')`
)

db.all("SELECT * FROM users").then(data => console.log(data))