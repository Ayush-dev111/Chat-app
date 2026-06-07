import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextResponse } from 'next/server';


export const jwtToken = (id: mongoose.Types.ObjectId, res: NextResponse): string =>{
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign({id}, JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookies.set("token", token,{
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",  
    })

    return token;
}