import { HttpException } from '@nestjs/common';
import { Error } from '.';
export class CustomException extends HttpException {
  constructor(customException: Error) {
    super(customException, customException.status);
  }
}
