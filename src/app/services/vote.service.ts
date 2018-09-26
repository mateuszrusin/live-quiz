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
export class VoteService {

    resultsCollection: AngularFirestoreCollection<Question>;

    constructor(private db: AngularFirestore) {
        this.resultsCollection = this.db.collection('/results');
    }

    create(quiz: string, question: string, data: object): Promise<DocumentReference> {


        return this.db
            .collection('/results')
            .doc(quiz)
            .collection('questions')
            .doc(question)
            .collection('votes')
            .add(data);

    }
}
