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

  // get party by id
  getPartyById(id: number): Observable<Party> {
    return this._httpClient.get<Party>(`${API_URL}party/?id=${id}`);
  }

  // create party
  createParty(party: Party): Observable<Party> {
    return this._httpClient.post<Party>(`${API_URL}party/`, party);
  }

  // update party by id
  updatePartyById(id: number, party: Party): Observable<Party> {
    return this._httpClient.put<Party>(`${API_URL}party/?id=${id}`, party);
  }

  // delete party
  deletePartyById(id: number): Observable<ApiResponse> {
    return this._httpClient.delete<ApiResponse>(`${API_URL}party/?id=${id}`);
  }
}
