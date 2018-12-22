import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { UserCreateDto } from 'src/app/controller/dto/userCreate.dto.';
import { UserService } from 'src/app/controller/services/user.service';

import { BookCreateComponent } from '../book-create/book-create.component';
import { UserResponse } from './../../controller/interfaces/user-response';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: UserResponse;

  public form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
  private userService: UserService, public snackBar: MatSnackBar,
  public dialogRef: MatDialogRef<BookCreateComponent>) { }

  ngOnInit() {
    this.user = this.data.user;
    this.createForm();
  }


  createForm() {
    const passwordControl = new FormControl('');
    this.form = this.fb.group ( {
      name: [this.user.name , Validators.compose ( [ Validators.required ] )],
      email: [this.user.email , Validators.compose ( [ Validators.required ] )],
      password: passwordControl,
      checkpassword: new FormControl('', [ CustomValidators.equalTo(passwordControl) ]),
      phone: [this.user.phone , Validators.compose ( [ Validators.required ] )]
    } );
  }

  passwordAutogen() {
    const newPass = Math.random().toString(36).slice(-8);
    this.form.controls['password'].setValue(newPass);
    this.form.controls['checkpassword'].setValue(newPass);
  }

  onSubmit() {
    const userEdited: UserCreateDto = <UserCreateDto>this.form.value;
    this.userService.edit(this.user.id, userEdited).toPromise()
    .then(resp => this.dialogRef.close(resp))
    .catch(() => this.snackBar.open('Error al editar el usuario.', 'Cerrar', {duration: 3000}));
  }
}
