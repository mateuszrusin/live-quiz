import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    passReset = false; // set to true when password reset is triggered
    isLoading = false;
    loginForm: FormGroup;
    formErrors: FormErrors = {
        'email': '',
        'password': '',
    };
    validationMessages = {
        'email': {
            'required': 'Email is required.',
            'email': 'Email must be a valid email',
        },
        'password': {
            'required': 'Password is required.',
            'pattern': 'Password must be include at one letter and one number.',
            'minlength': 'Password must be at least 4 characters long.',
            'maxlength': 'Password cannot be more than 40 characters long.',
        },
    };

    constructor(private fb: FormBuilder, private auth: AuthService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.buildForm();
    }

    login() {
        this.handleLoading(true);
        this.auth.emailLogin(this.loginForm.value['email'], this.loginForm.value['password'])
            .catch((error: Error) => {
                this.loginForm.reset();
                this.handleLoading(false);
                this.snackBar.open(error.message, '', {
                    duration: 5000,
                })
            });
    }

    resetPassword() {
        this.auth.resetPassword(this.loginForm.value['email'])
            .then(() => this.passReset = true);
    }

    buildForm() {
        this.loginForm = this.fb.group({
            'email': ['', [
                Validators.required,
                Validators.email,
            ]],
            'password': ['', [
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(6),
                Validators.maxLength(25),
            ]],
        });

        this.loginForm.valueChanges.subscribe((data) => this.onValueChanged(data));
        this.onValueChanged(); // reset validation messages
    }

    // Updates validation state on form changes.
    onValueChanged(data?: any) {
        if (!this.loginForm) { return; }
        for (const field in this.formErrors) {
            if (this.checkField(field)) {
                const control = this.loginForm.get(field);
                this.formErrors[field] = '';
                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    if (control.errors) {
                        for (const key in control.errors) {
                            if (Object.prototype.hasOwnProperty.call(control.errors, key) ) {
                                this.formErrors[field] += `${(messages as {[key: string]: string})[key]} `;
                            }
                        }
                    }
                }
            }
        }
    }

    private handleLoading(flag: boolean): void {
        this.isLoading = flag;
    }

    private checkField(field: string): boolean {
        return Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password');
    }
}
