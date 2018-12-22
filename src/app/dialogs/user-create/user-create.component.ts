import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { UserCreateDto } from 'src/app/controller/dto/userCreate.dto.';
import { UserService } from 'src/app/controller/services/user.service';

import { BookCreateComponent } from '../book-create/book-create.component';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  passwordControl = new FormControl('', [Validators.required]);
  public form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
  private userService: UserService, public dialogRef: MatDialogRef<BookCreateComponent>,
  public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group ( {
      name: [null , Validators.compose ( [ Validators.required ] )],
      email: [null , Validators.compose ( [ Validators.required ] )],
      password: this.passwordControl,
      checkpassword: new FormControl('', [Validators.required, CustomValidators.equalTo(this.passwordControl)]),
      phone: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  passwordAutogen() {
    const newPass = Math.random().toString(36).slice(-8);
    this.form.controls['password'].setValue(newPass);
    this.form.controls['checkpassword'].setValue(newPass);
  }

  onSubmit() {
    const userCreateDto: UserCreateDto = <UserCreateDto>this.form.value;
    this.userService.create(userCreateDto).toPromise()
    .then(resp => this.dialogRef.close(resp))
    .catch(() => this.snackBar.open('Error al crear el usuario.', 'Cerrar', {duration: 3000}));
  }

}
