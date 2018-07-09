import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

    private usersCollection: AngularFirestoreCollection = this.db.collection('/users');
    public users: Observable<any[]> = this.usersCollection.valueChanges();
    public user: any;
    public title: number;
    constructor(private db: AngularFirestore) {
        // this.user = this.usersCollection.doc('/1').valueChanges();
    }

    ngOnInit() {
      this.title = Math.random();
    }

}
