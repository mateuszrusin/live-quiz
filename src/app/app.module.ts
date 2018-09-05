import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './layouts/admin-layout/components/components.module';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import {AppRoutingModule} from './app.routing';
import {TranslateModule} from '@ngx-translate/core';
import {AuthGuard} from './services/auth.guard';
import {AuthService} from './services/auth.service';
import {AngularFireAuth, AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {QuizService} from './services/quiz.service';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        TranslateModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        PublicLayoutComponent
    ],
    providers: [
        AngularFireAuth,
        AuthGuard,
        AuthService,
        QuizService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
