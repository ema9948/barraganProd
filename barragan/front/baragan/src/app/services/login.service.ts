import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../utils/User';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private uri = environment.API_URI;
  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http
      .post(`${this.uri}/login`, user, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          const { body } = response;
          const { headers } = response;
          const bearerToke = headers.get('Authorization')!;
          const token = bearerToke?.replace('Berare ', '');

          localStorage.setItem('token', token);

          return body;
        })
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
