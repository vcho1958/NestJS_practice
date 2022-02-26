import { UserRole } from "src/auth/enum/userRole.enum";
import { DeepPartial } from "typeorm";

export class Authentication{
    username: string;
    role: UserRole;
    id: number;
}