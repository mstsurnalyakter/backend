const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001;
console.log(process.env)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/twitter",(req,res)=>{
    res.send("surnaly")
})

app.get("/login",(req,res)=>{
    res.send('<h1>Hello login</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port https://localhost:${port}`)
})