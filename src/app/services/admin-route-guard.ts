import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AdminRouteGuard implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.isAuthenticated()) {
            return this.router.navigate(['/login'], {
                queryParams: {
                    redirect: state.url
                },
            });
        } else if (!this.authService.isAdministrator()) {
            return this.router.navigateByUrl('/home');
        }
        return true;
    }
}
