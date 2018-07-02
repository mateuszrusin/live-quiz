import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {environment} from './../environments/environment';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import {AppComponent} from './app.component';

import {AngularFirestore} from 'angularfire2/firestore';
import {MatCheckboxModule} from '@angular/material';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule
    ],
    providers: [
        AngularFirestore
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
