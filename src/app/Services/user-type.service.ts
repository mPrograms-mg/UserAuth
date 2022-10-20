import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserTypeService {
  url = environment.apiUrl;
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('isLoggedIn'))
    );
    this.user = this.userSubject.asObservable();
  }

  signUp(formData: any): Observable<any> {
    return this.http.post(this.url + '/registration', formData);
  }

  login(LoginData: any): Observable<any> {
    return this.http.post(this.url + '/login', LoginData, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}

// private url = 'http://192.168.100.84:8000/user';
// registerUser(registerData: any): Observable<any> {
//   return this.http
//     .post<any>(this.url, registerData, {
//       headers: new HttpHeaders().set('Content-Type', 'application/json'),
//     })
//     .pipe(catchError(this.handleError));
// }
// getUser(): Observable<any> {
//   return this.http.get<any>(this.url).pipe(catchError(this.handleError));
// }
// logout(): void {
//   localStorage.setItem('isLoggedIn', 'false');
//   localStorage.removeItem('token');
// }
// getToke() {}
