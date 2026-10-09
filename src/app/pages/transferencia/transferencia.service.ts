import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Transferencia } from './transferencia';
import { environment } from '../../../environments/environment';
const API = environment.ApiUrl;
@Injectable({
  providedIn: 'root',
})
export class TransferenciaService {

  constructor(private http: HttpClient) {}

  getResumes() {
    return this.http.get<Transferencia[]>(`${API}/transferencia`);
  }
}
