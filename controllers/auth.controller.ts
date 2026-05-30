import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const signupController = async (req: NextRequest) => {
   try {
     const {firstName, lastName, email, password} = await req.json();

    if(!firstName || !lastName || !email || !password){
        return NextResponse.json({success:false, message: "all fields are required"}, {status: 400});
    }
    const user = await User.findOne({email})
    if(user){
        return NextResponse.json({success:false, message: "User already exists"}, {status: 400});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return NextResponse.json({success:false, message: "Invalid email format"}, {status: 400});
    }

    if(password.length < 6){
        return NextResponse.json({success:false, message: "Password must be at least 6 characters long"}, {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    return NextResponse.json({
        success: true,
        message: "Signup successful",
    },{status: 201});

   } catch (error) {
    console.log(error);
    return NextResponse.json({message:"Internal Server Error"}, {status: 500});
   }
};


export const loginController = async (req: NextRequest) => {
    try {
        const {email, password}= await req.json();
        if(!email || !password) return NextResponse.json({success:false, message: "all fields are required"}, {status: 400});

        const user = await User.findOne({email});
        if(!user) return NextResponse.json({success: false, message: "Invalid Credentials"}, {status: 400});

        const isPass = await bcrypt.compare(password, user.password);
        if(!isPass) return NextResponse.json({message:"Invalid Credentials"}, {status: 400});

        return NextResponse.json({
        success: true,
        message: "Login successful",
        },{status: 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Internal Server Error"}, {status: 500});
    }


}