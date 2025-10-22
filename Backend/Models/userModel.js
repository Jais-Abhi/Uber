import mongoose, { mongo } from"mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true,
});

userSchema.statics.hashPassword = async(password)=>{
    return await bcrypt.hash(password,10)
}
userSchema.methods.createjwtToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log(error);
        return false;
    }
}

userSchema.statics.verifyToken = async function(token) {
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    return decode._id
}

const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;