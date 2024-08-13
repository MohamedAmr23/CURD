const express = require('express')
const cors = require('cors')
const app = express()
const port = 2000
app.use(cors())
app.use(express.json())

const mysql=require('mysql2')
const query=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:"shopping"
})
// add user to database
app.post('/products',(req,res)=>{
    const {name,price,description}=req.body
    query.execute(`INSERT INTO products (name,price,describtion) VALUES('${name}','${price}','${description}')`)
    res.json({message:"success"})
})

// get all products
app.get('/products',(req,res)=>{
    query.execute(`SELECT * from products`,(err,data)=>{
        if(err){
            res.json({message:"error",err})
        }else{
            res.json({message:"success",data})
        }
    })
})

// get single product
app.get('/products/:id',(req,res)=>{
    const{id}=req.params
    query.execute(`SELECT * from products WHERE id=${id}`,(err,data)=>{
        if(err){
            res.json({message:"error",err})
        }else{
            res.json({message:"success",data})
        }
    })
})

//delete product
app.delete('/products',(req,res)=>{
    const {id}=req.body
    query.execute(`DELETE FROM products WHERE id=${id}`)
    res.json({message:"success"})
}) 

// update product
app.put('/products',(req,res)=>{
    const {id,name,price,description}=req.body
    query.execute(`UPDATE products SET name='${name}',price='${price}',describtion='${description}' WHERE id=${id}`)
    res.json({message:"success"})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))