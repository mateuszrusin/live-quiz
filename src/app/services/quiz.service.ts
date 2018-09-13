import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Quiz} from '../models/quiz';
import {map} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

    quizzesCollection: AngularFirestoreCollection<Quiz>;

    constructor(private db: AngularFirestore) {
        this.quizzesCollection = this.db.collection('/quizzes');
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

    delete(id: string): Promise<void> {
        return this.get(id).delete();
    }

    list(): Observable<Quiz[]> {
        return this.quizzesCollection.snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Quiz;
                    data.id = a.payload.doc.id;
                    return data;
                });
            })
        );
    }
}
