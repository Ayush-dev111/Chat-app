import { logoutController } from "@/controllers/auth.controller";
import { connectDatabase } from "@/lib/database";

export function POST(){
    connectDatabase();

    return logoutController();
}