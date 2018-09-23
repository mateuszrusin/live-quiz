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
export class EnterComponent implements OnInit {

    question: Question;
    quiz$: Observable<Quiz>;
    quiz: Quiz;

    index = 0;
    fadeIn = false;
    fadeOut = true;

    private id: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.id = params.get('id');
                return this.quizService.get(this.id).valueChanges();
            })
        );
    }
}
