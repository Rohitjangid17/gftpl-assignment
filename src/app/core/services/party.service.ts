import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  constructor(
    private _httpClient: HttpClient
  ) { }

  // get parties
  getParties() {
    return this._httpClient.get(`${API_URL}party/`);
  }
}
