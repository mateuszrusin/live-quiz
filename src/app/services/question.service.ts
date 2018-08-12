import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

    constructor(private db: AngularFirestore) { }

    /// Creates an question, then returns as an object
    create(): Observable<any> {
        // const empty = {};
        // const id = this.db.collection('/questions').add(empty).key;
        // return this.db.doc('/questions/' + id);
        return;
    }


    /// Updates an existing question
    update(question: Observable<any>, data: any) {
        // return question.update(data);
        return;
    }
}
