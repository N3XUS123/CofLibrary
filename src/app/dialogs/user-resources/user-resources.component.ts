import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { UserResponse } from 'src/app/controller/interfaces/user-response';
import { ResourceService } from 'src/app/controller/services/resource.service';
import { UserService } from 'src/app/controller/services/user.service';

import { ResourceReturnDialogComponent } from '../resource-return-dialog/resource-return-dialog.component';
import { ResourceResponse } from './../../controller/interfaces/resource-response';

@Component({
  selector: 'app-user-resources',
  templateUrl: './user-resources.component.html',
  styleUrls: ['./user-resources.component.scss']
})
export class UserResourcesComponent implements OnInit {

  user: UserResponse;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, public dialog: MatDialog,
  private resourceService: ResourceService, public dialogRef: MatDialogRef<UserResourcesComponent>,
  public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUser(this.data.user.id);
  }

  getUser(id: number) {
    this.userService.getOne(id).toPromise()
    .then(resp => this.user = resp)
    .catch(() => this.snackBar.open('Error al cargar los datos del usuario.', 'Cerrar', {duration: 3000}));
  }

  openDialogReturn(res: ResourceResponse) {
    const dialogLendResource = this.dialog.open(ResourceReturnDialogComponent, {data: {resource: res}, width: '500px'});
    dialogLendResource.afterClosed().toPromise().then(() => this.getUser(this.data.user.id));
  }

}
