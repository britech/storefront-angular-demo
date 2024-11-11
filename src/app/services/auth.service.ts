import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { User } from '../models/user';
import rows from '../models/users.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginSubject: Subject<boolean> = new Subject<boolean>();
  login$ : Observable<boolean> = this.loginSubject.asObservable();
  private isLoggedIn: boolean = false;
  private users: User[] = rows;

  constructor() { }

  updateState(isLoggedIn: boolean) : void {
    this.loginSubject.next(isLoggedIn);
  }

  authenticate(user: User) : boolean {
    console.log(this.users);
    let resolvedUser: User = this.users.find(e => e.username == user.username && e.password == user.password) ?? new User();
    resolvedUser.password = "";

    let exists = resolvedUser.username != "";
    
    if (exists) {
      sessionStorage.setItem('currentUser', JSON.stringify(resolvedUser));
    }
    this.loginSubject.next(exists);
    return exists;
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.loginSubject.next(false);
  }

  isAuthenticated() : boolean {
    try {
      let user : User = this.getCurrentUser();
      return user.username != "";
    } catch(err) {
      return false;
    }
  }

  isAdministrator(): boolean {
    return this.isAuthenticated() && this.getCurrentUser().role == "Administrator";
  }

  private getCurrentUser(): User {
    try {
      let user : User = Object.assign(new User(), JSON.parse(sessionStorage.getItem('currentUser') ?? "{}"));
      return user;
    } catch(err) {
      return new User();
    }
  }
}
