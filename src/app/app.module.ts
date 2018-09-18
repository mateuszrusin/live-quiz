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
import {environment} from '../environments/environment';
import {QuizService} from './services/quiz.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import {QuestionService} from './services/question.service';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
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
        QuizService,
        QuestionService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
