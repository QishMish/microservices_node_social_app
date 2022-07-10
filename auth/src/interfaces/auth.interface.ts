export interface IAuthGenericResponse {
  status: number;
  accessToken: string;
  refreshToken?: string;
}
export interface ISignUpResponse extends IAuthGenericResponse {
  status: number;
  accessToken: string;
  refreshToken?: string;
}
export interface ISignInResponse extends IAuthGenericResponse {
  status: number;
  accessToken: string;
  refreshToken?: string;
}
export interface IMe {
  id: number;
  email: string;
  username: string;
  verified: boolean;
  iat?: string;
  exp?: boolean;
}
