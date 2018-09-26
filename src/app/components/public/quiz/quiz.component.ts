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
import {VoteService} from '../../../services/vote.service';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

    question: Question;
    answers = [];
    quiz$: Observable<Quiz>;
    quiz: Quiz;

    index = 0;
    fadeIn = false;
    fadeOut = true;

    private id: string;
    private uid: string;

    constructor(
        private quizService: QuizService,
        private questionService: QuestionService,
        private voteService: VoteService,
        private route: ActivatedRoute
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

        const result =  this.answers
            .filter(answer => answer.checked)
            .map(answer => answer.value);

        const data = {
            user: this.uid,
            answer: result,
        }

        this.voteService
            .create(this.id, this.question.id, data)
            .then((doc) => console.log(doc));

    }

    fader(value) {
        this.fadeIn = false;
        this.fadeOut = true;
        this.index = this.index + value;
        this.questionService.get(this.quiz.questions[this.index]).valueChanges().subscribe((question: Question) => {
            this.question = question;

            this.answers = question.answers.map((answer, index) => {
                return {
                    value: index,
                    content: answer.content,
                    checked: false
                };
            });

            this.fadeOut = false;
            this.fadeIn = true;
        });
    }

    isSingle(question: Question): boolean {
        return question.type === QuestionType.Single;
    }

    isMulti(question: Question): boolean {
        return question.type === QuestionType.Multi;
    }
}
