import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { TaskService } from '../../services/task.service';

import { Task } from '../../models/task';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit {
    tasks$: Observable<Task[]>;
    editState = false;
    taskToEdit: Task;

    constructor(public taskService: TaskService) {
    }

    ngOnInit() {
        this.tasks$ = this.taskService.getTasks();
    }

    deleteTask(event, task) {
        const response = confirm('are you sure you want to delete?');
        if (response) {
            this.taskService.deleteTask(task);
        }
        return;
    }

    editTask(event, task) {
        this.editState = !this.editState;
        this.taskToEdit = task;
    }

    updateTask(task) {
        this.taskService.updateTask(task);
        this.taskToEdit = null;
        this.editState = false;
    }

    cancel(event, task) {
        //console.log(task);

        this.taskService.getTask(task).subscribe((task$) => {
            console.log(task$);
        });

        //console.log(task$);

        this.editState = false;
    }

}
