import { loginController } from "@/controllers/auth.controller";
import { connectDatabase } from "@/lib/database";
import { NextRequest } from "next/server";

export function POST(req: NextRequest){
    connectDatabase();

    return loginController(req);
}