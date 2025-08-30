import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../shared/constants';
import { Observable } from 'rxjs';
import { Party } from '../interfaces/party';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  constructor(
    private _httpClient: HttpClient
  ) { }

  // get parties
  getParties(): Observable<Party[]> {
    return this._httpClient.get<Party[]>(`${API_URL}party/`);
  }
}
