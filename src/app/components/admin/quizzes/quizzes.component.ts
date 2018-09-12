import {Component, OnInit, ViewChild} from '@angular/core';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from 'app/models/quiz';
import {Router} from '@angular/router';
import { ConfirmComponent } from '../../../layouts/admin-layout/components/dialog/confirm/confirm.component';

@Component({
    selector: 'app-quiz',
    templateUrl: './quizzes.component.html',
    styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = ['position', 'title', 'questions', 'created', 'modified', 'edit', 'delete', 'show'];
    dataSource = new MatTableDataSource<any>();

    data: any[] = [];
    resultsLength = 0;

    public quizzes: Observable<Quiz[]>;
    public quiz: Observable<Quiz>;

    constructor(
        private quizService: QuizService,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.quizService.list();
                }),
                map(data => {
                    const start = this.paginator.pageIndex * this.paginator.pageSize;
                    this.resultsLength = data.length;
                    return data.slice(start, start + this.paginator.pageSize);
                }),
                catchError(() => {
                    return observableOf([]);
                })
            ).subscribe(data => this.data = data);
    }

    filter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    add() {
        this.quizService.create().then(
            (data) => this.edit(data.id)
        );
    }

    edit(id: string) {
        this.router.navigate(['/admin/quiz/' + id]);
    }

    show(id: string) {
        this.router.navigate(['/quiz/' + id]);
    }

    delete(id: string) {

        this.dialog.open(ConfirmComponent, {
            data: 'Are you sure to delete this quiz?'
        }).afterClosed().subscribe(result => {
            if (result) {
                this.quizService.delete(id).then(() =>
                    this.snackBar.open('Quiz deleted!', '', {
                        duration: 5000,
                    })
                );
            }
        });
    }
}
