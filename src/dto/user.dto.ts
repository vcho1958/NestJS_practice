import { UserRole } from "../auth/enum/userRole.enum";
import { LoginDataDto } from "./loginData.dto";

export class UserDto extends LoginDataDto {
  role: UserRole;
}