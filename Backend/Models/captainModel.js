import mongoose from "mongoose"

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
            requierd:true,
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