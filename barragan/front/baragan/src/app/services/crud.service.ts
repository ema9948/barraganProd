import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../utils/User';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private uri = environment.API_URI;
  constructor(private _http: HttpClient) {}

  allCliente(): Observable<User[]> {
    return this._http.get<User[]>(`${this.uri}/api/v1/client/`);
  }

  addCliente(usuario: User) {
    return this._http.post(`${this.uri}/api/v1/client/`, usuario, {
      observe: 'response',
    });
  }

  patchCliente(usuario: User, id: number) {
    return this._http.patch(`${this.uri}/api/v1/client/${id}`, usuario, {
      observe: 'response',
    });
  }

  patchClientFinish(usuario: User) {
    console.log(usuario);
    return this._http.put(`${this.uri}/api/v1/client/finish/${usuario.id}`, {
      observe: 'response',
    });
  }
  deleteCliente(usuario: User) {
    return this._http.delete(`${this.uri}/api/v1/client/${usuario.id}`, {
      observe: 'response',
    });
  }
}
