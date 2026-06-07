import mongoose from "mongoose";

interface Iuser{
    id?: mongoose.Types.ObjectId
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    profileImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
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

const User = (mongoose.models.user as mongoose.Model<Iuser>) || mongoose.model<Iuser>("user", userSchema);

export default User;