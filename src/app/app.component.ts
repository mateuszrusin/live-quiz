import { Component } from '@angular/core';
import {Observable} from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public check: boolean;
    private usersCollection: AngularFirestoreCollection = this.db.collection('/users');
    public users: Observable<any[]> = this.usersCollection.valueChanges();
    public user: any;
    constructor(private db: AngularFirestore) {
        this.user = this.usersCollection.doc('/1').valueChanges();
    }
}
