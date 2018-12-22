import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { UserService } from 'src/app/controller/services/user.service';

import { PasswordResponse } from './../../controller/interfaces/password-response';
import { UserDataResponse } from './../../controller/interfaces/user-data-response';
import { UserResponse } from './../../controller/interfaces/user-response';
import { AuthService } from './../../controller/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserResponse;

  public profForm: FormGroup;
  public passForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService,
    private authService: AuthService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.authService.checkToken()) {
      this.router.navigate(['/']);
    } else {
      this.profForm = this.fb.group ( {
        name: [null , Validators.compose ( [ Validators.required ] )],
        email: [null , Validators.compose ( [ Validators.required ] )],
        phone: [null , Validators.compose ( [ Validators.required ] )]
      });
      this.loadUser();
      this.passwordForm();
    }
  }

  loadUser() {
    this.user = <UserResponse>this.authService.getLoginData();
    this.userService.getOne(this.authService.getTokenData().id).toPromise()
    .then((res) => this.user = res)
    .then(() => this.profileForm())
    .catch(() => this.snackBar.open('Error al cargar el usuario.', 'Cerrar', {duration: 3000}));

  }

  profileForm() {
    this.profForm.controls['name'].setValue(this.user.name);
    this.profForm.controls['email'].setValue(this.user.email);
    this.profForm.controls['phone'].setValue(this.user.phone);
  }

  passwordForm() {
    const passwordControl = new FormControl(null, Validators.required);
    this.passForm = this.fb.group ( {
      password: [null , Validators.compose ( [ Validators.required ] )],
      newpassword: passwordControl,
      checkpassword: new FormControl(null, [ CustomValidators.equalTo(passwordControl) ]),
    });
  }

  passwordAutogen() {
    const newPass = Math.random().toString(36).slice(-8);
    this.passForm.controls['newpassword'].setValue(newPass);
    this.passForm.controls['checkpassword'].setValue(newPass);
  }

  onProfileSubmit() {
    const userEdited: UserDataResponse = <UserDataResponse>this.profForm.value;
    this.userService.editProfile(userEdited).toPromise()
    .then(() => this.loadUser())
    .catch(() => this.snackBar.open('Error al actualizar el usuario.', 'Cerrar', {duration: 3000}));
  }

  onPasswordSubmit() {
    const passwordEdited: PasswordResponse = <PasswordResponse>this.passForm.value;
    this.userService.editPassword(passwordEdited).toPromise()
    .then(() => {
      this.passForm.controls['password'].setValue(null);
      this.passForm.controls['newpassword'].setValue(null);
      this.passForm.controls['checkpassword'].setValue(null);
    }).catch(() => this.snackBar.open('Error al actualizar la contraseña.', 'Cerrar', {duration: 3000}));
  }

}
