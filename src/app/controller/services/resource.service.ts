import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { LendDto } from '../dto/lend.dto';
import { ResourceResponse } from '../interfaces/resource-response';
import { BookCreateDto } from './../dto/bookCreate.dto';
import { AuthService } from './auth.service';

const url = `${environment.apiUrl}/recurso`;


@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  };

  getAll(): Observable<ResourceResponse[]> {
    return this.http.get<ResourceResponse[]>(`${url}/all`, this.requestOptions);
  }

  createResource(resource: BookCreateDto): Observable<ResourceResponse> {
    return this.http.post<ResourceResponse>(`${url}/create`, resource, this.requestOptions);
  }

  removeResource(id: number): Observable<ResourceResponse[]> {
    return this.http.delete<ResourceResponse[]>(`${url}/${id}`, this.requestOptions);
  }

  editResource(id: number, resource: BookCreateDto): Observable<ResourceResponse> {
    return this.http.put<ResourceResponse>(`${url}/edit/${id}`, resource, this.requestOptions);
  }

  lend(resourceId: number, user: LendDto): Observable<ResourceResponse> {
    return this.http.put<ResourceResponse>(`${url}/prestar/${resourceId}`, user, this.requestOptions);
  }

  return(resourceId: number): Observable<ResourceResponse> {
    return this.http.put<ResourceResponse>(`${url}/devolver/${resourceId}`, null, this.requestOptions);
  }

 /*  getCover(isbn: string): Observable<BookApiResponse> {
    return this.http.get<BookApiResponse>(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
  }

  getFilm(name: string): Observable<MovieApiResponse> {
    return this.http.get<MovieApiResponse>(` http://www.omdbapi.com/?apikey=9bb99b77&t=${name}`);
  } */

}
