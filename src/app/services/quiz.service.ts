import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Quiz} from '../models/quiz';
import {map} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Question} from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

    quizzesCollection: AngularFirestoreCollection<Quiz>;
    questionsCollection: AngularFirestoreCollection<Question>;

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

    save(id: string, data: Quiz): Promise<void> {

        const questions = [];

        const batch = this.db.firestore.batch();
        const questionsCollection = this.db.collection('/questions');

        data.questions.forEach((question: Question, index) => {
            questions.push(question.id);
            batch.set(questionsCollection.doc(question.id).ref, question);
        });

        return batch.commit().then(() => {
            data.modified = new Date().getTime();
            data.questions = questions;

            return this.get(id).update(data);
        });
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
