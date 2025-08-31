export interface UserLogin {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: boolean;
  token: string;
}
