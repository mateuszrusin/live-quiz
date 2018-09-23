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

    constructor(private db: AngularFirestore) {
        this.quizzesCollection = this.db.collection('/quizzes');
    }

    create() {
        const quiz: Quiz = {
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

        const batch = this.db.firestore.batch();
        const questionsCollection = this.db.collection('/questions');
        const questions = data.questions.map((question) => {

            batch.set(questionsCollection.doc(question.id).ref, question);

            return question.id;
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
