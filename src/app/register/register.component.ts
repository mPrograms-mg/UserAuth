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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  Registration: FormGroup;
  responseMessage: any;
  submitted = false;
  // userType = [
  //   { id: '1', value: 'Admin' },
  //   { id: '2', value: 'User' },
  // ];
  constructor(
    private RegisterForm: FormBuilder,
    private usersType: UserTypeService,
    private route: Router
  ) {
    this.Registration = this.RegisterForm.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(GlobalConstants.emailRegex),
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(GlobalConstants.contactNumberRegex),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(GlobalConstants.nameRegex),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(GlobalConstants.password),
      ]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
      // userType: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.Registration.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Registration.patchValue({
        fileSource: file,
      });
    }
  }
  ngOnInit(): void {}
  Register() {
    this.submitted = true;
    if (this.Registration.invalid) {
      return;
      // alert('All Fields are Required');
    }

    const formData = new FormData();
    formData.append('firstName', this.Registration.get('firstName').value);
    formData.append('lastName', this.Registration.get('lastName').value);
    formData.append('email', this.Registration.get('email').value);
    formData.append('mobile', this.Registration.get('mobile').value);
    formData.append('username', this.Registration.get('username').value);
    formData.append('password', this.Registration.get('password').value);
    formData.append('file', this.Registration.get('fileSource').value);
    this.usersType.signUp(formData).subscribe(
      (response: any) => {
        console.log('Res', response);
        this.responseMessage = response?.message;
        alert('User Created');
        console.log('Message', this.responseMessage);
        this.route.navigate(['login']);
        this.Registration.reset();
      },
      (error) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
      }
    );
  }
}

//  console.log('Res', response);
//  this.responseMessage = response?.message;
//  alert('User Created');
//  console.log('Message', this.responseMessage);
//  this.route.navigate(['login']);
// this.usersType.registerUser(this.Registration.value).subscribe(
//       (res) => {
//         console.log('Res......', res);
//         alert('User Added Successfully........');
//         this.route.navigate(['/login']);
//       },
//       (error) => {
//         console.log('Error....');
//       }
//     );

//mPrograms
//mmk12!@#
