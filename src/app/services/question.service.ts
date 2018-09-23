import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Quiz} from '../models/quiz';
import {map} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference} from '@angular/fire/firestore';
import {Question} from '../models/question';
import {QuestionType} from '../models/question-type';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

    questionsCollection: AngularFirestoreCollection<Question>;

    constructor(private db: AngularFirestore) {
        this.questionsCollection = this.db.collection('/questions');
    }

    /// Creates an question, then returns as an object
    create(): Promise<DocumentReference> {
        const question: Question = {
            type: QuestionType.Single,
            title: '',
            content: '',
            created: new Date().getTime(),
            answers: []
        };

        return this.questionsCollection.add(question);
    }

    get(id: string): AngularFirestoreDocument<Question> {
        return this.questionsCollection.doc(id);
    }


    save(questions: Question[]): Promise<any> {
        const batch = this.db.firestore.batch();

        questions.map((question) => {
            batch.set(this.questionsCollection.doc(question.id).ref, question);
        });

        return batch.commit();
    }

    // save(id: string, data: any): Promise<void> {
    //
    //     const questions = [];
    //
    //     data.modified = new Date().getTime();
    //     console.log('save');
    //     data.questions.forEach((question, index) => {
    //         console.log(question, index);
    //
    //         // this.db.collection('/questions').add(question).then((doc) => questions.push(doc.id));
    //     });
    //
    //     return this.get(id).update(data);
    // }
    //
    // delete(id: string): Promise<void> {
    //     return this.get(id).delete();
    // }
    //
    // list(): Observable<Quiz[]> {
    //     return this.quizzesCollection.snapshotChanges().pipe(
    //         map(changes => {
    //             return changes.map(a => {
    //                 const data = a.payload.doc.data() as Quiz;
    //                 data.id = a.payload.doc.id;
    //                 return data;
    //             });
    //         })
    //     );
    // }
}
