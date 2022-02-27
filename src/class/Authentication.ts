import { UserRole } from "src/constants";
import { DeepPartial } from "typeorm";

export class Authentication{
    username: string;
    role: UserRole;
    userInfoId: number;
}