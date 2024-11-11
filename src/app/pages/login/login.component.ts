import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private returnUrl : string = "/";

  constructor(private router : Router, 
    private activatedRoute : ActivatedRoute,
    private authService : AuthService,
    private snackBar : MatSnackBar) { 

  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['redirect'];
  }

  onSubmit(form: NgForm) : void{
    if (form.invalid) {
      return;
    }

    let user : User = new User();
    user.username = form.value.username;
    user.password = form.value.password;
    
    if (this.authService.authenticate(user)) {
      this.router.navigateByUrl(this.returnUrl);
      return;
    }

    form.resetForm();
    this.snackBar.open('Access Denied', 'Dismiss', {
      duration: 1000
    });
  }
}
