'use server'
import fs from 'node:fs'

const sql = require('better-sqlite3')
const db = sql('test.db')

export async function allFlowers() {
    return db.prepare(`SELECT * FROM flowers`).all()
}

export async function flowerDetails(id) {
    return db.prepare(`SELECT * FROM flowers WHERE id = ?`).get(id)
}

export async function request(data) {
    return db.prepare(`INSERT INTO request (name, email, phone, address, service, others) VALUES
 (@name, @email, @phone, @address, @service, @others)`).run(data)
}

export async function allServices() {
    return db.prepare(`SELECT * FROM request`).all()
}

export async function uploadFlower(flower) {
    const extension = flower.image.name.split('.').pop()
    const fileName = `${flower.title}.${extension}`
    const writeSt = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImg = await flower.image.arrayBuffer()
    writeSt.write(Buffer.from(bufferedImg), (error) => {
        if (error) {
            throw new Error('Could Not Uploaded');
        }
        flower.image = `/images/${fileName}`;
        return db.prepare(`INSERT INTO flowers (title, description, price, stock, image) VALUES
         (@title, @description, @price, @stock, @image)`).run(flower)
    })

}

export async function orders(orderdata) {

    const result = db.prepare(`INSERT INTO orders (name, phone, address, postal, status, token, cartItem) VALUES
 (@name, @phone, @address, @postal, @status,@token, @cartItem)`).run(orderdata)
    return result.lastInsertRowid;
}

export async function updateStock(id, stock) {
    return db.prepare(`UPDATE flowers SET stock = ? WHERE id = ?`).run(stock, id)
}

export async function allOrders() {
    return db.prepare(`SELECT * FROM orders`).all()
}

export async function ShowDeleteflower(title) {
    return db.prepare(`SELECT * FROM flowers WHERE title = ?`).get(title)
}
export async function deleteFlower(title) {
    return db.prepare('DELETE FROM flowers WHERE title = ?').run(title)
}

export async function updateStatus(orderId, status) {
    return db.prepare(`UPDATE orders SET status = @status WHERE id = @id`)
        .run({ id: orderId, status });
}

export async function selectedOrder(id) {
    return db.prepare(`SELECT * FROM orders WHERE id = ?`).get(id)
}

export async function selectedOrderByToken(token) {
    return db.prepare(`SELECT * FROM orders WHERE token = ?`).get(token)
}

