import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from 'app/models/quiz';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { QuestionType } from '../../../models/question-type';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

    public quizForm: FormGroup;
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

        this.quizForm = this.fb.group({
            title: '',
            questions: this.fb.array([])
        });

        // this.quizForm.valueChanges.subscribe(console.log);

        this.quiz$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.id = params.get('id');
                return this.quizService.get(this.id).valueChanges();
            })
        );

        this.quiz$.subscribe(data => {

            this.quiz = data;

            this.quizForm.patchValue(data);

            const questions = data.questions.map(question => {
                const answers = question.answers.map(answer => {
                    return this.fb.group({
                        content: [answer.content],
                        isCorrect: [answer.isCorrect]
                    });
                });

                return this.fb.group({
                    type: [question.type],
                    title: [question.title],
                    content: [question.content],
                    answers: this.fb.array(answers),
                })
            });

            this.quizForm.setControl('questions', this.fb.array(questions));
        });
    }

    fader(value) {
        this.fadeIn = false;
        this.fadeOut = true;
        setTimeout( () => {
            this.index = this.index + value;
            this.fadeOut = false;
            this.fadeIn = true;
        }, 2000 );
    }
}
