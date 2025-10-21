export interface AuthCredentials {
  username: string;
  password: string;
}
export interface LoginResponse {
  token: string;
}
export interface ErrorResponse {
  message: string;
  error: string;
}
export interface LoginRequest extends AuthCredentials {}
export interface RegisterRequest extends AuthCredentials {}
