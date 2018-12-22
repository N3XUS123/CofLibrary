import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { ResourceResponse } from 'src/app/controller/interfaces/resource-response';
import { AuthService } from 'src/app/controller/services/auth.service';
import { ResourceService } from 'src/app/controller/services/resource.service';
import { BookCreateComponent } from 'src/app/dialogs/book-create/book-create.component';
import { BookEditComponent } from 'src/app/dialogs/book-edit/book-edit.component';
import { ResourceLendComponent } from 'src/app/dialogs/resource-lend/resource-lend.component';

import { Resource } from './../../controller/model/resource';
import { BookDeleteComponent } from './../../dialogs/book-delete/book-delete.component';
import { ResourceReturnDialogComponent } from './../../dialogs/resource-return-dialog/resource-return-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  resources: Resource[];
  bookCover: string;
  titleFilter: any = { title: null };
  typeFilter: any = { type: {name: null}};

  public config: PaginationInstance = {
    itemsPerPage: 12,
    currentPage: 1
  };

  constructor(private resourceService: ResourceService, public dialog: MatDialog,
    private authService: AuthService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.authService.checkToken()) {
      this.router.navigate(['/']);
    } else {
      this.getAll();
    }
  }

  getAll() {
    this.resourceService.getAll().toPromise()
    .then(resourceList => this.resources = resourceList)
    .catch(() => this.snackBar.open('Error al cargar los datos.', 'Cerrar', {duration: 3000}));
  }

  openDialogNewResource() {
    const dialogNewResource = this.dialog.open(BookCreateComponent, {width: '500px'});
    dialogNewResource.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('Error al actualizar la lista de recursos.', 'Cerrar', {duration: 3000}));
  }

  openDialogEditResource(res: ResourceResponse) {
    const dialogEditResource = this.dialog.open(BookEditComponent, {data: {resource: res}, width: '500px' });
    dialogEditResource.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('Error al actualizar la lista de recursos.', 'Cerrar', {duration: 3000}));
  }

  openDialogDeleteResource(res: ResourceResponse) {
    const dialogDeleteResource = this.dialog.open(BookDeleteComponent, {data: {resource: res}});
    dialogDeleteResource.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('Error al actualizar la lista de recursos.', 'Cerrar', {duration: 3000}));
  }

  isAdmin() {
    return localStorage.getItem('role') === 'admin';
  }

  openDialogLend(res: ResourceResponse) {
    const dialogLendResource = this.dialog.open(ResourceLendComponent, {data: {resource: res}, width: '500px'});
    dialogLendResource.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('Error al actualizar la lista de recursos.', 'Cerrar', {duration: 3000}));
  }

  openDialogReturn(res: ResourceResponse) {
    const dialogLendResource = this.dialog.open(ResourceReturnDialogComponent, {data: {resource: res}, width: '500px'});
    dialogLendResource.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('Error al actualizar la lista de recursos.', 'Cerrar', {duration: 3000}));
  }

  filterAll() {
    this.typeFilter = { type: {name: null}};
  }

  filterBooks() {
    this.typeFilter = { type: {name: 'Libro'}};
  }

  filterMagazines() {
    this.typeFilter = { type: {name: 'Revista'}};
  }

  filterMovies() {
    this.typeFilter = { type: {name: 'Película'}};
  }

  next() {
    if (this.config.currentPage < this.resources.length / this.config.itemsPerPage) {
      this.config.currentPage += 1;
    }
  }

  last() {
    if (this.config.currentPage > 1) {
      this.config.currentPage -= 1;
    }
  }

/*   getCover() {
    const isbn = '8498409799';
    this.resourceService.getCover(isbn).toPromise().then(book => this.bookCover = `url(${book.items[0].volumeInfo.imageLinks.thumbnail})`);
    const name = 'Harry Potter';
    this.resourceService.getFilm(name).toPromise().then(film => console.log(film.Poster));
    )
  } */

}
