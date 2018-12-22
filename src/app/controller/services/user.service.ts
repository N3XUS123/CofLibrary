import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { UserResponse } from '../interfaces/user-response';
import { UserCreateDto } from './../dto/userCreate.dto.';
import { PasswordResponse } from './../interfaces/password-response';
import { UserDataResponse } from './../interfaces/user-data-response';
import { AuthService } from './auth.service';

const url = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  };

  getAll(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${url}/all`, this.requestOptions);
  }

  getOne(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${url}/${id}`, this.requestOptions);
  }

  create(user: UserCreateDto): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${url}/create`, user, this.requestOptions);
  }

  edit(id: number, user: UserCreateDto): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${url}/${id}`, user, this.requestOptions);
  }

  editProfile(user: UserDataResponse): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${url}/update/profile`, user, this.requestOptions);
  }

  editPassword(pass: PasswordResponse): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${url}/change/password`, pass, this.requestOptions);
  }

  remove(id: number): Observable<UserResponse[]> {
    return this.http.delete<UserResponse[]>(`${url}/${id}`, this.requestOptions);
  }


}
