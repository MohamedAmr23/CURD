const express = require('express')
const app = express()
const port = 2000
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
app.get('/product/:id',(req,res)=>{
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
app.delete('/product',(req,res)=>{
    const {id}=req.body
    query.execute(`DELETE FROM products WHERE id=${id}`)
    res.json({message:"success"})
}) 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))