import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {FormBuilder} from '@angular/forms';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from 'app/models/quiz';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

    displayedColumns: string[] = ['position', 'title', 'id', 'action'];
    dataSource = new MatTableDataSource<any>();

    data: any[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public quizzes: Observable<Quiz[]> = this.quizService.list();

    public quiz: Observable<Quiz>;

    constructor(private quizService: QuizService, private fb: FormBuilder) {

    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.quizzes;
                }),
                map(data => {
                    // Flip flag to show that loading has finished.
                    this.isLoadingResults = false;
                    this.isRateLimitReached = false;
                    this.resultsLength = data.length;
                    return data;
                }),
                catchError(() => {
                    this.isLoadingResults = false;
                    // Catch if the GitHub API has reached its rate limit. Return empty data.
                    this.isRateLimitReached = true;
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
        console.log('ADD');
        this.quizService.create().then(
            (data) => {
                this.quiz = this.quizService.get(data.id).valueChanges();
            }
        );
    }

    edit(id: string) {
        console.log('EDIT ' + id);
        this.quiz = this.quizService.get(id).valueChanges();
    }
}
