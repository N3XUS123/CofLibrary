import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ResourceResponse } from 'src/app/controller/interfaces/resource-response';
import { UserResponse } from 'src/app/controller/interfaces/user-response';
import { ResourceService } from 'src/app/controller/services/resource.service';

import { LendDto } from './../../controller/dto/lend.dto';
import { UserService } from './../../controller/services/user.service';

@Component({
  selector: 'app-resource-lend',
  templateUrl: './resource-lend.component.html',
  styleUrls: ['./resource-lend.component.scss']
})
export class ResourceLendComponent implements OnInit {

  displayedColumns: string[] = ['email', 'acciones'];
  dataSource: MatTableDataSource<UserResponse>;
  resource: ResourceResponse = this.data.resource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService,
  private resourceService: ResourceService, public dialogRef: MatDialogRef<ResourceLendComponent>,
  public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.userService.getAll().toPromise()
    .then(userList => this.dataSource = new MatTableDataSource(userList))
    .then(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(() => this.snackBar.open('Error al cargar los usuarios.', 'Cerrar', {duration: 3000}));
  }

  lend(userId: number) {
    const user: LendDto = {userId: userId};
    this.resourceService.lend(this.resource.id, user).toPromise()
    .then(() => this.dialogRef.close())
    .catch(() => this.snackBar.open('Error al prestar el recurso.', 'Cerrar', {duration: 3000}));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
