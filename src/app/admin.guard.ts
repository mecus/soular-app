import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()

export class AdminGuard implements CanActivate {

    constructor(){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const access = localStorage.getItem('priv');
        if(access === "promiseLand181225"){
            return true;
        }
        return false;
    }
}