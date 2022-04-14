import sqlite3 from "sqlite3"
import { open } from "sqlite"

const db = await open({
    filename: "database/beers.db",
    driver: sqlite3.Database
})

export default db
