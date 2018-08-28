import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
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
            type: '',
            title: '',
            content: '',
            answers: this.fb.array([]),
        });

        this.questionForms.push(question);
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
        if (this.questionForms.at(i).value.type === 'single') {
            let checked = 0;
            this.getAnswerForms(i).controls.forEach((answer) => {
                if (answer.value.isCorrect && ++checked > 1) {
                    console.log(event);
                    this.snackBar.open('Only one correct answer permitted!', '', {
                        duration: 1000,
                    })
                }
            });
        }
    }
}
