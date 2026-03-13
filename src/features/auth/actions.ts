"use server";

import { registerUser } from "@/server/services/userService";
import { RegisterInput } from "@/types/auth.types";

export async function registerUserAction(data: RegisterInput) {
    return registerUser(data);
}