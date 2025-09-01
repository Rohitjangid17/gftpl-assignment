import { Injectable } from '@angular/core';
import { API_URL, TOKEN_KEY } from '../../shared/constants';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  private _authChecked = new BehaviorSubject<boolean>(false);
  public authChecked$ = this._authChecked.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _storageService: StorageService
  ) { }

  // login user
  login(username: string, password: string): Observable<LoginResponse> {
    return this._httpClient.post<LoginResponse>(`${API_URL}login/`, { username, password });
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

  // load user from storage on app init
  loadUserFromStorage() {
    const token = this.getToken();
    this._isLoggedIn.next(!!token);
    this._authChecked.next(true);
  }
}
