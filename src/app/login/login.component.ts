import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserTypeService } from '../Services/user-type.service';
import { GlobalConstants } from '../shared/globale.contant';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Login: FormGroup;
  responseMessage: any;
  submitted = false;
  // userType = [
  //   { id: '1', value: 'Admin' },
  //   { id: '2', value: 'User' },
  // ];
  constructor(
    private LoginUser: FormBuilder,
    private usersType: UserTypeService,
    private route: Router
  ) {
    this.Login = this.LoginUser.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
        Validators.pattern(GlobalConstants.nameRegex),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(GlobalConstants.password),
      ]),
      // userType: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.Login.controls;
  }

  LoginType() {
    this.submitted = true;
    if (this.Login.invalid) {
      return;
      // alert('All Fields are Required');
    }
    let loginData = this.Login.value;
    this.usersType.login(loginData).subscribe(
      (response: any) => {
        console.log('Res', response);
        console.log('Token', response.token);
        localStorage.setItem('userToken', JSON.stringify(response.token));
        localStorage.setItem(
          'userName',
          JSON.stringify(this.Login.value.username)
        );
        localStorage.setItem('isLoggedIn', 'true');
        this.responseMessage = response?.message;
        alert(this.responseMessage);

        this.route.navigate(['dashboard']);
        this.Login.reset();
      },
      (error) => {
        this.responseMessage = error.error?.message;
        console.log('Error===>', error.error?.message);
        this.Login.reset();
      }
    );

    // this.usersType.getUser().subscribe((res) => {
    //   const validType = res.find((data: any) => {
    //     return (
    //       this.Login.value.username === data.username &&
    //       this.Login.value.password === data.password
    //     );
    //   });
    //   if (validType) {
    //     alert('Login Successfully....');
    //     this.route.navigate(['/home']);
    //     localStorage.setItem('isLoggedIn', 'true');
    //     localStorage.setItem('token', this.f['username']?.value);
    //     this.Login.reset();
    //   } else {
    //     alert('Wrong User....');
    //     this.Login.reset();
    //     this.route.navigate(['/login']);
    //   }
    // });
  }
}
