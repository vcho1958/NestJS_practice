import { HttpStatus } from '@nestjs/common';

export type Error = {
  status: HttpStatus;
  message: string;
  code?: string;
};

type ErrorObject = {
  [key: string]: Error;
};

const errors: ErrorObject = {
  //Unauthorized
  LOGIN_REQUIRED: {
    status: HttpStatus.UNAUTHORIZED,
    message: '로그인이 필요합니다.',
  },
  PERMISSON_REQUIRED: {
    status: HttpStatus.UNAUTHORIZED,
    message: '권한이 없습니다.',
  },
  TOKEN_EXPIRED: {
    status: HttpStatus.UNAUTHORIZED,
    message: '토큰이 만료되었습니다.',
  },

  //CONFLICT
  /*
    회원가입 시 중복데이터 검증
  */
  DUPLICATE_USERNAME: {
    status: HttpStatus.CONFLICT,
    message: '이미 사용중인 ID입니다.',
  },
  DUPLICATE_NICKNAME: {
    status: HttpStatus.CONFLICT,
    message: '이미 사용중인 닉네임입니다.',
  },
  DUPLICATE_GRADE_NUMBER: {
    status: HttpStatus.CONFLICT,
    message: '이미 가입되어있는 학번입니다.',
  },
  DUPLICATE_EMAIL: {
    status: HttpStatus.CONFLICT,
    message: '이미 가입되어있는 이메일입니다.',
  },
  DUPLICATE_PHONE: {
    status: HttpStatus.CONFLICT,
    message: '이미 가입되어있는 휴대폰 번호입니다.',
  },

  /*
    관리자 페이지
  */

  DUPLICATE_MAJOR: {
    status: HttpStatus.CONFLICT,
    message: '이미 존재하는 학과입니다.',
  },
  DUPLICATE_CLASS_NUMBER: {
    status: HttpStatus.CONFLICT,
    message: '이미 존재하는 과목번호입니다.',
  },

  //BadRequest
  WRONG_LOGIN_DATA: {
    status: HttpStatus.BAD_REQUEST,
    message: '아이디 혹은 비밀번호가 맞지 않습니다.',
  },
  WRONG_USERNAME: {
    status: HttpStatus.BAD_REQUEST,
    message: '올바른 ID형식이 아닙니다.',
  },
  CONTENT_REQUIRED: {
    status: HttpStatus.BAD_REQUEST,
    message: '내용을 입력해주세요.',
  },
  TITLE_REQUIRED: {
    status: HttpStatus.BAD_REQUEST,
    message: '제목을 입력해주세요.',
  },
  USERNAME_REQUIRED: {
    status: HttpStatus.BAD_REQUEST,
    message: 'ID를 입력해주세요.',
  },
  NAME_REQUIRED: {
    status: HttpStatus.BAD_REQUEST,
    message: '이름을 입력해주세요.',
  },
  NICKNAME_REQUIRED: {
    status: HttpStatus.BAD_REQUEST,
    message: '닉네임을 입력해주세요.',
  },
  EMAIL_REQUIRED: {
    status: HttpStatus.BAD_REQUEST,
    message: '이메일을 입력해주세요.',
  },
  EMAIL_VALIDATION_REQUIRE: {
    status: HttpStatus.BAD_REQUEST,
    message: '이메일 인증이 필요합니다.',
  }, //회원가입 시에는 중복만 체크하고 로그인 시 검사
  PHONE_REQUIRED: {
    status: HttpStatus.BAD_REQUEST,
    message: '휴대폰 번호를 입력해주세요.',
  },
  PHONE_VALIDATION_REQUIRE: {
    status: HttpStatus.BAD_REQUEST,
    message: '이메일 인증이 필요합니다.',
  }, //회원가입 시 검사
  GRADE_NUMBER_REQUIRED: {
    status: HttpStatus.BAD_REQUEST,
    message: '학번을 입력해주세요.',
  },
  GRADE_REQUIRED: {
    status: HttpStatus.BAD_REQUEST,
    message: '학년을 입력해주세요.',
  }, //학년
  MAJOR_REQUIRED: {
    status: HttpStatus.BAD_REQUEST,
    message: '학과를 입력해주세요.',
  },
  ROLE_REQUIRED: {
    status: HttpStatus.BAD_REQUEST,
    message: '역할 정보가 필요합니다.',
  },
};

Object.keys(errors).forEach(
  (code) => (errors[code] = { ...errors[code], code }),
);

export default { ...errors };
