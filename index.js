const express = require('express')
const mongoose=require('mongoose')
const app = express()
const env=require('dotenv')
const UserData=require('./model/userData')
const bodyParser = require('body-parser')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

env.config()
const port = process.env.PORT||3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
//mongdb connection 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to DB successfuly");
}).catch((e)=>{
    console.log(e);
})
//register route
app.post('/register',async(req,res)=>{
    try {
       let{name,email,mobile,pwd}=req.body

       

if(!name||!email||!mobile||!pwd){
    res.status(400).send("bhai sare field bar de");
}else{
// res.status(200).send("bara badiya adami h")

// res.json(req.body)
 


        const oldUser=  await UserData.findOne({email})


if(oldUser){
    res.status(400).send("bhai teri to kasi n le le")
}else{


   
    let encryptedPassword=await bcrypt.hash(pwd,10);
    console.log(encryptedPassword);

    const userdata = await UserData.create({
        name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        mobile,
        pwd: encryptedPassword,
    });


    if (userdata) {
        const token = jwt.sign({name, email,mobile,pwd }, process.env.SECRET_KEY, { expiresIn: "72h" })
        res.status(200).send(token);
    }




    res.status(200).send("app dene ko tayar ho")
    
}



}

    } catch (error) {
        console.log(error);
    }

})

//login route
app.post("/login",async(req,res)=>{
    try {

        let {email,pwd}=req.body;
        if(!email||!pwd){
            res.status(400).send("Bhai form barle pale")
        }else{
            const user = await UserData.findOne({ email });

            if (user && bcrypt.compare(pwd, user.pwd)) {
                const token = jwt.sign({ email, pwd }, process.env.SECRET_KEY, { expiresIn: "72h" })
                // res.write("bhai tu sahi admi h")
                res.status(200).send("bhai tu sahi admi h    "+token);
            }
    
            }
        }
        
     catch (error) {
        console.log(error);
        
    }

})


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))