import { Injectable } from '@angular/core';
import { TOKEN, TOKEN_KEY } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // login user
  login(username: string, password: string) {
    localStorage.setItem(TOKEN_KEY, TOKEN);
    return true;
  }

  // logout user
  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  // get token
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  // check if user is logged in
  isLoggedIn() {
    return !!this.getToken();
  }
}
