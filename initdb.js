const sql = require('better-sqlite3')
const db = sql('test.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS flowers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT  NOT NULL,
    stock INTEGER NOT NULL,
    price INTEGER NOT NULL
  )
`)
const items = [
  { title: 'rose', image: '/images/rose.jpg', description: 'It is red', stock: 20, price: 7.99 },
  { title: 'Lily', image: '/images/lily.jpg', description: 'It is white', stock: 15, price: 9.99 },
  { title: 'Sun Flower', image: '/images/sunflower.jpg', description: 'It is yellow', stock: 10, price: 11.99 }
]

const stmt = db.prepare(`
  INSERT INTO flowers (title, image, description, stock, price)
  VALUES (@title, @image, @description, @stock, @price)
`)

items.forEach(item => {
  stmt.run(item)
})

db.exec(`
    CREATE TABLE IF NOT EXISTS request (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT  NOT NULL,
    address TEXT NOT NULL,
    service TEXT NOT NULL,
    others TEXT NOT NULL
  )
  `)

db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT  NOT NULL,
    address TEXT NOT NULL,
    postal TEXT NOT NULL,
    status TEXT NOT NULL,
    token TEXT NOT NULL,
    cartItem TEXT NOT NULL
  )
  `)
