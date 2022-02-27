import { UserRole } from "../constants";
import { LoginDataDto } from "./loginData.dto";

export class UserDto extends LoginDataDto {
  role: UserRole;
}