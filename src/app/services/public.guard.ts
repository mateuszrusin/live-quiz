import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router, ParamMap, ActivatedRoute
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import { AuthService } from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class PublicGuard implements CanActivate {

    constructor(
        private route: ActivatedRoute,
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.route.paramMap.pipe(
            map((params: ParamMap) => {
                return localStorage.getItem('uid') === params.get('uid');
            })
        );
    }

}
