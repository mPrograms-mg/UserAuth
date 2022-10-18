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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  Registration: FormGroup;

  userType = [
    { id: '1', value: 'Admin' },
    { id: '2', value: 'User' },
  ];
  constructor(
    private RegisterForm: FormBuilder,
    private usersType: UserTypeService,
    private route: Router
  ) {
    this.Registration = this.RegisterForm.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      userType: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  Register() {
    this.usersType.registerUser(this.Registration.value).subscribe(
      (res) => {
        console.log('Res......', res);
        alert('User Added Successfully........');
        this.route.navigate(['/login']);  
      },
      (error) => {
        console.log('Error....');
      }
    );
    this.Registration.reset();
  }
}
