import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CategoryDto } from '../dto/category.dto';
import { CategoryResponse } from './../interfaces/category-response';
import { AuthService } from './auth.service';

const url = `${environment.apiUrl}/categoria`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient, private authService: AuthService) { }

    requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };

    getAll(): Observable<CategoryResponse[]> {
      return this.http.get<CategoryResponse[]>(`${url}/all`, this.requestOptions);
    }

    create(cat: CategoryDto): Observable<CategoryResponse> {
      return this.http.post<CategoryResponse>(`${url}/create`, cat, this.requestOptions);
    }

    edit(id: number, cat: CategoryDto): Observable<CategoryResponse> {
      return this.http.put<CategoryResponse>(`${url}/edit/${id}`, cat, this.requestOptions);
    }

    delete(id: number): Observable<CategoryResponse[]> {
      return this.http.delete<CategoryResponse[]>(`${url}/${id}`, this.requestOptions);
    }
  }
