import { Component } from '@angular/core';
import {Observable} from 'rxjs';

import { AngularFirestore } from 'angularfire2/firestore';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public items: Observable<any[]>;
    public questions: Observable<any[]>;
    public check: boolean;

    constructor(db: AngularFirestore) {
        this.items = db.collection('/users').valueChanges();
        this.questions = db.collection('/questions').valueChanges();
    }
}
