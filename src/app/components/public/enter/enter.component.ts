import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-enter',
    template: '',
})
export class EnterComponent {

    constructor(
        router: Router,
        route: ActivatedRoute,
    ) {
        route.params.subscribe(params => {
            localStorage.setItem('uid', Math.random().toString(36).substr(2, 9));

            return router.navigate(['quiz', params.id, localStorage.getItem('uid')]);
        })
    }
}
