import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserTypeService } from './Services/user-type.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'UserAuth';
  user: Boolean = false;
  constructor(private route: Router) {}
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('isLoggedIn'));
    console.log('User..', this.user);
  }
}
