import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../shared/constants';
import { Observable } from 'rxjs';
import { Party } from '../interfaces/party';
import { ApiResponse } from '../interfaces/api-response';

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

  // create party
  createParty(party: Party): Observable<Party> {
    return this._httpClient.post<Party>(`${API_URL}party/`, party);
  }

  // delete party
  deletePartyById(id: number): Observable<ApiResponse> {
    return this._httpClient.delete<ApiResponse>(`${API_URL}party/?id=${id}`);
  }
}
