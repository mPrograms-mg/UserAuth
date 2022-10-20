import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName: string;

  constructor(private route: Router) {
    this.userName = JSON.parse(localStorage.getItem('userName'));
  }

  ngOnInit(): void {}
  logout() {
    alert('Logout');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    this.route.navigate(['/login']);
  }
}
