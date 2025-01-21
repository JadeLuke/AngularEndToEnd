const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root', 
    password: process.env.DB_PASSWORD || 'Letsdoit!',
    database: process.env.DB_NAME || 'product_db', 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0  
})

app.get('/api/products',(req,res) => {
    pool.execute('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({message: 'Error'})
        }
        res.json(results)
    })
})

app.get('/api/products/:id', (req, res) => {
    pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id], (err, results) => {
        if(err){
          console.error(err)
          return res.status(500).json({message: 'Error'})
        }
        if(results.length === 0){
            return res.status(404).json({message: 'Product not found'})
        }
        res.json(results[0])
    })
})

app.post('/api/products', (req, res) => {
    const { name, description, price } = req.body
    pool.execute('INSERT INTO products (name, description, price) VALUES (?,?,?)', [name, description, price], 
    (err, results) => {
        if (err){
            console.error(err);
            return res.status(500).json({message: 'Error creating product'})
        }
        res.status(201).json({
            id: results.insertId,
            name,
            description,
            price
        })
    }
)
})

app.put('/api/products/:id', (req,res) => {
    const { name, description, price} = req.body
    pool.execute('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [name,description,price, req.params.id],
    (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({message: 'Error updating product'})
        }
        if (results.affectedRows === 0 ){
            return res.status(404).json({message: 'Product not found'})
        }
        res.json({
            id: parseInt(req.params.id),
            name,
            description,
            price
        })
    }
)
})

app.delete('/api/products/:id', (req,res) => {
pool.execute('DELETE FROM products WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
        console.error(err)
        return res.status(500).json({message: 'Error deleting product'})
    }
    if (results.affectedRows === 0 ){
        return res.status(404).json({message: 'Product not found'})
    }
    res.status(204).send()
})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})