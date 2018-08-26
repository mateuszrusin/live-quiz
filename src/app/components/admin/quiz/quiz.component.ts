import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from 'app/models/quiz';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

    public quizForm: FormGroup;
    public quiz$: Observable<Quiz>;

    private id: string;

    constructor(
        private quizService: QuizService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
    ) {

    }

    ngOnInit() {

        this.quizForm = this.fb.group({
            title: '',
            questions: this.fb.array([])
        });

        this.quizForm.valueChanges.subscribe(console.log);

        this.quiz$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.id = params.get('id');
                return this.quizService.get(this.id).valueChanges();
            })
        );

        this.quiz$.subscribe(data => {
            let i = 0;
            this.quizForm.patchValue(data);
            for (const question of data.questions) {
                this.questionForms.setControl(i++, this.fb.group(question));
            }

        });

    }

    save() {
        this.quizService.save(this.id, this.quizForm.value).then(() =>
            this.snackBar.open('Quiz Saved', '', {
                duration: 5000,
            })
        );
    }

    get questionForms(): FormArray {
        return this.quizForm.get('questions') as FormArray
    }

    addQuestion() {
        const question = this.fb.group({
            title: Math.random(),
            content: 'Content ' + Math.random(),
            answers: [],
        });

        this.questionForms.push(question);
    }

    deleteQuestion(i) {
        this.questionForms.removeAt(i)
    }
}
