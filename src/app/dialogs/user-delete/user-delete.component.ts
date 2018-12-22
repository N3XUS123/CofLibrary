import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { UserResponse } from 'src/app/controller/interfaces/user-response';

import { UserService } from './../../controller/services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  user: UserResponse;

  public form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private userService: UserService, public dialogRef: MatDialogRef<UserDeleteComponent>,
    public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.user = this.data.user;
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group ( {
      borrar: [null , Validators.compose ( [ Validators.required, Validators.pattern(/ELIMINAR$/) ] )]
    });
  }

  onSubmit() {
    this.userService.remove(this.user.id).toPromise()
    .then(resp => this.dialogRef.close(resp))
    .catch(() => this.snackBar.open('Error al borrar el usuario.', 'Cerrar', {duration: 3000}));
  }
}
