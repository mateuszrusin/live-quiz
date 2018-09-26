import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-quiz-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

    @Input() answers: any[];

    constructor() { }

    ngOnInit() {
    }

    check(event): void {
        this.answers.forEach((answer) => {
            answer.checked = answer.value === event.value
        });
    }
}
