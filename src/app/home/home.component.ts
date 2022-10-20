import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeService } from '../Services/user-type.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  name: string;
  constructor(private service: UserTypeService, private route: Router) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('token');
  }

  // logout() {
  //   alert('Logout');
  //   this.service.logout();
  //   this.route.navigate(['/login']);
  // }
}
