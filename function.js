const mongoose = require('mongoose')
var validator = require('validator');
const jwt = require("jsonwebtoken")


mongoose.connect("mongodb://localhost:27017/chatApp", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connectioned successfully...")).catch((err) => console.log(err))


const newSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        lowercase: true,
        min: 5
    },
    Phone: {
        type: Number,
        unique: true,
        required: true,
    },
    Email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email!")
            }
        }
    },
    Password: {
        type: String,
        required: true,
        min: 6
    },
    Tokens:[{
        Token:{
            type:String,
            required:true
        }
    }]
   
})


newSchema.methods.getAuthtokens = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()},"welcometotheauthenticateprotocol")
        this.Tokens = this.Tokens.concat({Token:token})
        await this.save()
        return token
        
    } catch (error) {
        console.log(error)
    }
}

const UserData = mongoose.model("Register",newSchema)
module.exports = UserData






