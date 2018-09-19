import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {last, mergeMap, switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from 'app/models/quiz';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { QuestionType } from '../../../models/question-type';
import {Question} from '../../../models/question';
import {QuestionService} from '../../../services/question.service';

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
        private questionService: QuestionService,
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

        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.id = params.get('id');
                return this.quizService.get(this.id).valueChanges();
            }))
            .subscribe(data => this.buildForm(data));
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
        this.questionService.create().then(
            (data) => {
                const question = this.fb.group({
                    id: [data.id],
                    type: [QuestionType.Single],
                    title: [''],
                    content: [''],
                    answers: this.fb.array([]),
                });

                this.questionForms.push(question);
            }
        );
    }

    deleteQuestion(i) {
        this.questionForms.removeAt(i)
    }

    getAnswerForms(i): FormArray {
        return this.questionForms.at(i).get('answers') as FormArray
    }

    addAnswer(i) {
        const answer = this.fb.group({
            content: '',
            isCorrect: false
        });

        this.getAnswerForms(i).push(answer);
    }

    deleteAnswer(i, j) {
        this.getAnswerForms(i).removeAt(j);
    }

    change(event, i) {
        if (this.questionForms.at(i).value.type === QuestionType.Single) {

            const correct = this.getAnswerForms(i).controls
                .map((answer) => answer.value.isCorrect ? 1 : 0)
                .reduce((acc, value) => acc + value, 0);

            if (correct !== 1) {
                this.snackBar.open('Single choice question must have one correct answer!', '', {
                    duration: 1000,
                })
            }
        }
    }

    private buildForm(data: Quiz): void {

        this.quizForm.patchValue(data);

        if (!this.questionForms.length) {
            data.questions.map((id, index) => {
                this.questionService.get(id).valueChanges().subscribe((question) => {
                    const answers = question.answers.map(answer => {
                        return this.fb.group({
                            content: [answer.content],
                            isCorrect: [answer.isCorrect]
                        });
                    });

                    const questionGroup = this.fb.group({
                        id: [question.id],
                        type: [question.type],
                        title: [question.title],
                        content: [question.content],
                        answers: this.fb.array(answers),
                    });

                    this.questionForms.push(questionGroup);
                });
            });
        }
    }
}
