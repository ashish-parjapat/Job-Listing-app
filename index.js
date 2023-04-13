const express = require('express')
const mongoose=require('mongoose')
const app = express()
const env=require('dotenv')
env.config()
const port = process.env.PORT||3000
//mongdb connection 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to DB successfuly");
}).catch((e)=>{
    console.log(e);
})



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))