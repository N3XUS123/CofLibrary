import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/controller/dto/login.dto';
import { AuthService } from 'src/app/controller/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  emailRegex: any = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService, public snackBar: MatSnackBar) {}

  ngOnInit() {
    if (!this.authService.checkToken()) {
      this.router.navigate(['/books']);
    }
    this.doForm();
  }

  doForm() {
    this.form = this.fb.group ( {
      email: [null , Validators.compose ( [ Validators.pattern(this.emailRegex), Validators.required ] )],
      password: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  onSubmit() {
    const loginDto: LoginDto = <LoginDto>this.form.value;
    this.authService.login(loginDto).toPromise()
    .then(res => this.authService.setLoginData(res))
    .then(() => this.router.navigate(['/books']))
    .catch(() => this.snackBar.open('Email o contraseña incorrectos', 'Cerrar', {duration: 3000}));
  }
}
