import { Injectable } from '@angular/core';
import { API_URL, TOKEN_KEY } from '../../shared/constants';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _httpClient: HttpClient,
    private _storageService: StorageService
  ) { }

  // login user
  login(username: string, password: string) {
    return this._httpClient.post(`${API_URL}login/`, { username, password });
  }

  // logout user
  logout() {
    return this._httpClient.post(`${API_URL}logout/`, {});
  }

  // token set
  setToken(token: string) {
    this._storageService.setItem(TOKEN_KEY, token);
  }

  // get token
  getToken(): string | null {
    return this._storageService.getItem(TOKEN_KEY);
  }

  // clear token
  clearToken(): void {
    this._storageService.removeItem(TOKEN_KEY);
  }

  // check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
