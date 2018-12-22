import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { isNull } from 'util';

import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../interfaces/login-response';
import { UserDataResponse } from './../interfaces/user-data-response';
import { UserResponse } from './../interfaces/user-response';

const authUrl = `${environment.apiUrl}/auth`;
const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${authUrl}/login`, loginDto, requestOptions);
  }

  setLoginData(loginResponse: LoginResponse) {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('username', loginResponse.name);
    localStorage.setItem('email', loginResponse.email);
    localStorage.setItem('role', loginResponse.role);
    localStorage.setItem('phone', loginResponse.phone);
  }

  getLoginData(): UserDataResponse {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    const phone = localStorage.getItem('phone');
    return {name: username, email: email, role: role, phone: phone};
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  checkToken(): boolean {
    const re = /^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.([a-zA-Z0-9\-_]+)$/;
    if (isNull(this.getToken())) {
      localStorage.clear();
      return true;
    } else if (this.getToken().match(re)) {
      const helper = new JwtHelperService();
      return helper.isTokenExpired(this.getToken());
    }

    localStorage.clear();
    return true;
  }

  getTokenData(): UserResponse {
    const helper = new JwtHelperService();
      return helper.decodeToken(this.getToken()).user;
  }

}
