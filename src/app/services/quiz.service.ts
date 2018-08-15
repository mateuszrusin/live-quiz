import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {Quiz} from '../models/quiz';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

    quizzesCollection: AngularFirestoreCollection<Quiz>;
    quizzes: Observable<Quiz[]>;
    quizDocument: AngularFirestoreDocument<Quiz>;

    constructor(private db: AngularFirestore) {
        this.quizzesCollection = this.db.collection('/quizzes');
        // this.tasks = this.afs.collection('tasks').valueChanges();
        this.quizzes = this.quizzesCollection.snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Quiz;
                    data.id = a.payload.doc.id;
                    return data;
                });
            })
        );
    }

    /// Creates an question, then returns as an object
    create(): AngularFirestoreDocument<Quiz> {
        const quiz = {};
        this.quizzesCollection.add(quiz).then();

        //  console.log(id);

        // return this.db.doc('/questions/' + id);
        return;
    }


    /// Updates an existing question
    update(question: Observable<any>, data: any) {
        // return question.update(data);
        return;
    }

    list(): Observable<Quiz[]> {
        return this.quizzes;
    }
}
