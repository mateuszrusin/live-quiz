import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-quiz-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

    @Input() answers: any[];

    constructor() { }

    ngOnInit() {
    }

}
