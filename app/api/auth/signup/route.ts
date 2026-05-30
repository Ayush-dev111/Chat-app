import { signupController } from "@/controllers/auth.controller";
import { connectDatabase } from "@/lib/database";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
    await connectDatabase();

    return signupController(req);
}