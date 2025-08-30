import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private headers = new HttpHeaders({
    'Authorization': 'Token aa4d0b1b9b2794090b18febbd71cf2c90e0d5a83',
    'Content-Type': 'application/json'
  });
  constructor(
    private _httpClient: HttpClient
  ) { }

  // get parties
  getParties() {
    return this._httpClient.get(`${API_URL}/pv-api/dealer/`, { headers: this.headers });
  }
}
