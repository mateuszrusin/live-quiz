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
import {QuestionService} from '../../../services/question.service';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

    question: Question;
    quiz$: Observable<Quiz>;
    quiz: Quiz;

    index = 0;
    fadeIn = false;
    fadeOut = true;

    private id: string;
    private uid: string;
    private answer: number[] = [];

    constructor(
        private quizService: QuizService,
        private questionService: QuestionService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.quiz$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.id = params.get('id');
                this.uid = params.get('uid');
                return this.quizService.get(this.id).valueChanges();
            })
        );

        this.quiz$.subscribe(data => {
            this.quiz = data;
            this.fader(0);
        });
    }

    save() {
        console.log(this.question);
    }

    fader(value) {
        this.fadeIn = false;
        this.fadeOut = true;
        this.index = this.index + value;
        this.questionService.get(this.quiz.questions[this.index]).valueChanges().subscribe((question: Question) => {
            this.question = question;
            this.fadeOut = false;
            this.fadeIn = true;
        });
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
