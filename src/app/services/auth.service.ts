import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';

import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

interface User {
    uid: string;
    email?: string | null;
    photoURL?: string;
    displayName?: string;
}

@Injectable()
export class AuthService {
    user: Observable<User | null>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {
        this.user = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
            // tap(user => localStorage.setItem('user', JSON.stringify(user))),
            // startWith(JSON.parse(localStorage.getItem('user')))
        );
    }

    ////// OAuth Methods /////

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }

    githubLogin() {
        const provider = new firebase.auth.GithubAuthProvider();
        return this.oAuthLogin(provider);
    }

    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.oAuthLogin(provider);
    }

    twitterLogin() {
        const provider = new firebase.auth.TwitterAuthProvider();
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider: any) {
        return this.afAuth.auth
            .signInWithPopup(provider)
            .then(credential => {
                return this.updateUserData(credential.user);
            })
            .catch(error => this.handleError(error));
    }

    //// Anonymous Auth ////

    anonymousLogin() {
        return this.afAuth.auth
            .signInAnonymously()
            .then(credential => {
                return this.updateUserData(credential.user); // if using firestore
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    //// Email/Password Auth ////

    emailSignUp(email: string, password: string) {
        return this.afAuth.auth
            .createUserWithEmailAndPassword(email, password)
            .then(credential => {
                return this.updateUserData(credential.user); // if using firestore
            })
            .catch(error => this.handleError(error));
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth
            .signInWithEmailAndPassword(email, password)
            .then(credential => {
                // console.log(credential);
                // return this.updateUserData(credential.user);
                return this.router.navigate(['/admin']);
            });
    }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
        const fbAuth = firebase.auth();

        return fbAuth
            .sendPasswordResetEmail(email)
            .then(() => console.log('pass reset'))
            .catch(error => this.handleError(error));
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/login']);
        });
    }

    // If error, console log and notify user
    private handleError(error: Error) {
        console.error(error);
    }

    // Sets user data to firestore after succesful login
    private updateUserData(user: User) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(
            `users/${user.uid}`
        );

        const data: User = {
            uid: user.uid,
            email: user.email || null,
            displayName: user.displayName || 'nameless user',
            photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
        };
        return userRef.set(data);
    }
}
