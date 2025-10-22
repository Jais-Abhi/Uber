import  jwt from "jsonwebtoken"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"]
        },
        lastName: {
            type: String
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, "Password must be at least 6 characters long"]
    },
    status:{
        type:String,
        enum : ["active","inactive"],
        required : true,
        default : "inactive"
    },
    vehicle:{
        color: {
            type : String,
            trim :true,
            required:true,
            minlength:[3, " Color should be at least 3 character long"]
        },
        plate:{
            type:String,
            required : true,
            trim : true
        },
        capacity : {
            type : Number,
            required :true,
            trim : true,
            min : [1, " passenger must be atleast 1"],
            max : [6 , "you can't carry more than 6 passengers"]
        },
        type:{
            type : String,
            required : true,
            enum : ["bike","taxi","car"],
            trim : "true"
        }
    },
    location:{
        latitude : {
            type : String,
        },
        longitude : {
            type : String
        }
    }

})

captainSchema.methods.createJwtToken = function(){
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn : "7d" })
}

captainSchema.methods.comparePasswords = async function(password) {
    return bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword = async function(password) {
    return bcrypt.hash(password, 10)
}

captainSchema.statics.verifyToken =  function (token) {
    const  decode =  jwt.verify(token,process.env.JWT_SECRET)
    return decode._id
}
const captainModel =  mongoose.model("captainModel",captainSchema)

export default captainModel