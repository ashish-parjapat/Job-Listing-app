const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
   name:String,
   email:String,
   mobile:Number,
   pwd:String 
})

module.exports=mongoose.model('UserData',userSchema);