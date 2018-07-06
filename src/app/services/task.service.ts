import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class TaskService {
    tasksCollection: AngularFirestoreCollection<Task>;
    tasks: Observable<Task[]>;
    taskDoc: AngularFirestoreDocument<Task>;

    constructor(public afs: AngularFirestore) {
        this.tasksCollection = this.afs.collection('tasks');
        // this.tasks = this.afs.collection('tasks').valueChanges();
        this.tasks = this.tasksCollection.snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Task;
                    data.id = a.payload.doc.id;
                    return data;
                });
            })
        );
    }

    getTasks() {
        return this.tasks;
    }

    getTask(task: Task) {
        this.taskDoc = this.afs.doc(`tasks/${task.id}`);
        return this.taskDoc.valueChanges().pipe(
            map(changes => {
                return changes;
            })
        );
    }

    addTask(task: Task) {
        this.tasksCollection.add(task);
    }

    deleteTask(task: Task) {
        this.taskDoc = this.afs.doc(`tasks/${task.id}`);
        this.taskDoc.delete();
    }

    updateTask(task: Task) {
        this.taskDoc = this.afs.doc(`tasks/${task.id}`);
        this.taskDoc.update(task);
    }
}
