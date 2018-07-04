import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { environment } from './../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { AppComponent } from './app.component';

import { AngularFirestore } from 'angularfire2/firestore';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksComponent } from './components/tasks/tasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskService } from './services/task.service';

@NgModule({
    declarations: [
        AppComponent,
        TasksComponent,
        AddTaskComponent
    ],
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule
    ],
    providers: [
        AngularFirestore,
        TaskService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
