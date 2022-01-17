import { UserRole } from "../enum/userRole.enum";
import { AuthenticationDto } from "./authentication.dto";




export class UserInfoDto extends AuthenticationDto {
  role: UserRole;
}