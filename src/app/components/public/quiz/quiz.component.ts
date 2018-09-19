import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from 'app/models/quiz';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {QuestionType} from '../../../models/question-type';
import {Question} from '../../../models/question';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

    public question: any;
    public quiz$: Observable<Quiz>;
    public quiz: Quiz;

    public index = 0;
    fadeIn = false;
    fadeOut = false;

    private id: string;

    constructor(
        private quizService: QuizService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.quiz$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.id = params.get('id');
                return this.quizService.get(this.id).valueChanges();
            })
        );

        this.quiz$.subscribe(data => {
            this.quiz = data;
            this.question = data.questions[this.index];
        });
    }

    fader(value) {
        this.fadeIn = false;
        this.fadeOut = true;
        setTimeout( () => {
            this.index = this.index + value;
            this.question = this.quiz.questions[this.index];
            this.fadeOut = false;
            this.fadeIn = true;
        }, 1000 );
    }

    check(event) {
        console.log(event);
    }

    isSingle(question: Question): boolean {
        return question.type === QuestionType.Single;
    }

    isMulti(question: Question): boolean {
        return question.type === QuestionType.Multi;
    }
}
