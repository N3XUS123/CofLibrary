import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { UserResponse } from 'src/app/controller/interfaces/user-response';
import { AuthService } from 'src/app/controller/services/auth.service';
import { UserDeleteComponent } from 'src/app/dialogs/user-delete/user-delete.component';

import { UserService } from './../../controller/services/user.service';
import { UserCreateComponent } from './../../dialogs/user-create/user-create.component';
import { UserEditComponent } from './../../dialogs/user-edit/user-edit.component';
import { UserResourcesComponent } from './../../dialogs/user-resources/user-resources.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  users: UserResponse[];
  emailFilter: any = { email: null };

  public config: PaginationInstance = {
    itemsPerPage: 12,
    currentPage: 1
  };

  constructor(public dialog: MatDialog, private userService: UserService,
    private authService: AuthService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.authService.checkToken()) {
      this.router.navigate(['/']);
    } else {
      this.getAll();
    }
  }

   getAll() {
    this.userService.getAll().toPromise()
    .then(list => this.users = list)
    .catch(() => this.snackBar.open('Error al cargar los datos.', 'Cerrar', {duration: 3000}));
  }

  openDialogCreate() {
    const dialogNewResource = this.dialog.open(UserCreateComponent, {width: '500px'});
    dialogNewResource.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('Error al actualizar la lista de usuarios.', 'Cerrar', {duration: 3000}));
  }

  openDialogDelete(res: UserResponse) {
    const dialogDelete = this.dialog.open(UserDeleteComponent, {data: {user: res}});
    dialogDelete.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('Error al actualizar la lista de usuarios.', 'Cerrar', {duration: 3000}));
  }

  openDialogEdit(res: UserResponse) {
    const dialogEdit = this.dialog.open(UserEditComponent, {data: {user: res}, width: '500px' });
    dialogEdit.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('Error al actualizar la lista de usuarios.', 'Cerrar', {duration: 3000}));
  }

  openDialogResources(res: UserResponse) {
    this.dialog.open(UserResourcesComponent, {data: {user: res}, width: '500px'});
  }

  isAdmin() {
      return localStorage.getItem('role') === 'Admin';
  }

  next() {
    if (this.config.currentPage < this.users.length / this.config.itemsPerPage) {
      this.config.currentPage += 1;
    }
  }

  last() {
    if (this.config.currentPage > 1) {
      this.config.currentPage -= 1;
    }
  }

}
