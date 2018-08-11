import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserService} from './user.service';
import {AuthService} from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        public afAuth: AngularFireAuth,
        public authService: AuthService,
        private router: Router
    ) {
    }

    // canActivate(): Promise<boolean> {
    //     return new Promise((resolve, reject) => {
    //         this.authService.user.subscribe(
    //             (user) => {
    //                 console.log(user);
    //                 this.router.navigate(['/dashboard']);
    //                 return resolve(false);
    //             }, err => {
    //
    //                 console.log('lipa');
    //                 return resolve(false);
    //             });
    //     });
    // }

    canActivate() {

        console.table(['tak']);

        if (localStorage.getItem('isLoggedin')) {
            return true;
        }

        this.router.navigate(['/admin/login']);
        return false;
    }
}
