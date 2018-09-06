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
    create() {

        const quiz = {
            title: '',
            created: new Date().getTime(),
            questions: []
        };

        return this.quizzesCollection.add(quiz);
    }

    get(id: string): AngularFirestoreDocument<Quiz> {
        return this.quizzesCollection.doc(id);
    }

    save(id: string, data: any): Promise<void> {
        data.modified = new Date().getTime();
        return this.get(id).update(data);
    }

    list(): Observable<Quiz[]> {
        return this.quizzes;
    }
}
