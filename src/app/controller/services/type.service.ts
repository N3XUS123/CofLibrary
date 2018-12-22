import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { TypeResponse } from '../interfaces/type-response';
import { AuthService } from './auth.service';

const url = `${environment.apiUrl}/tipo`;

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  };

  getAll(): Observable<TypeResponse[]> {
    return this.http.get<TypeResponse[]>(`${url}/all`, this.requestOptions);
  }
}
