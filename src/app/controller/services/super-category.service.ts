import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { SuperCategoryDto } from '../dto/superCategory.dto';
import { SuperCategoryResponse } from '../interfaces/super-category-response';
import { AuthService } from './auth.service';

const url = `${environment.apiUrl}/supercategoria`;

@Injectable({
  providedIn: 'root'
})
export class SuperCategoryService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  };

  getAll(): Observable<SuperCategoryResponse[]> {
    return this.http.get<SuperCategoryResponse[]>(`${url}/all`, this.requestOptions);
  }

  create(cat: SuperCategoryDto): Observable<SuperCategoryResponse> {
    return this.http.post<SuperCategoryResponse>(`${url}/create`, cat, this.requestOptions);
  }

  edit(id: number, cat: SuperCategoryDto): Observable<SuperCategoryResponse> {
    return this.http.put<SuperCategoryResponse>(`${url}/edit/${id}`, cat, this.requestOptions);
  }

  delete(id: number): Observable<SuperCategoryResponse[]> {
    return this.http.delete<SuperCategoryResponse[]>(`${url}/${id}`, this.requestOptions);
  }

}
