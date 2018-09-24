import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, ParamMap, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
                return true;
                // return localStorage.getItem('uid') === params.get('uid');
            })
        );
    }

}
