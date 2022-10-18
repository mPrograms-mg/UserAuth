import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserTypeService } from '../Services/user-type.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Login: FormGroup;
  userType = [
    { id: '1', value: 'Admin' },
    { id: '2', value: 'User' },
  ];
  constructor(
    private LoginUser: FormBuilder,
    private usersType: UserTypeService,
    private route: Router
  ) {
    this.Login = this.LoginUser.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      // userType: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.Login.controls;
  }
  LoginType() {
    this.usersType.getUser().subscribe((res) => {
      const validType = res.find((data: any) => {
        return (
          this.Login.value.username === data.username &&
          this.Login.value.password === data.password
        );
      });
      if (validType) {
        alert('Login Successfully....');
        this.route.navigate(['/home']);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', this.f['username']?.value);
        this.Login.reset();
      } else {
        alert('Wrong User....');
        this.Login.reset();
        this.route.navigate(['/login']);
      }
    });
  }
}
