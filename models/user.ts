import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName:{
        type: String,
        default: ""
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    profileImage:{
        type: String,
        default: "",
    }
})

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;