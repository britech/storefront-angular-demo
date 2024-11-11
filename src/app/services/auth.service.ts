import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginSubject: Subject<boolean> = new Subject<boolean>();
  login$ : Observable<boolean> = this.loginSubject.asObservable();
  private isLoggedIn: boolean = false;

  constructor() { }

  updateState(isLoggedIn: boolean) : void {
    this.loginSubject.next(isLoggedIn);
  }

  authenticate(user: User) : boolean {
    let result : boolean = user.username == 'admin' && user.password == 'nimda';
    sessionStorage.setItem('currentUser', btoa(user.username));
    this.loginSubject.next(result);
    return result;
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.loginSubject.next(false);
  }

  isAuthenticated() : boolean {
    try {
      let user = sessionStorage.getItem('currentUser') ?? "";
      return atob(user) == 'admin';
    } catch(err) {
      return false;
    }
  }
}
