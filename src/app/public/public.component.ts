import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {FormGroup} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {Validators} from '@angular/forms';

@Component({
    selector: 'app-public',
    templateUrl: './public.component.html',
    styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

    private usersCollection = this.db.collection('/users');
    public users: Observable<any[]> = this.usersCollection.valueChanges();
    public user: any;

    myForm: FormGroup;

    loading: boolean;
    success = false;


    constructor(private db: AngularFirestore, private fb: FormBuilder) {
        // this.user = this.usersCollection.doc('/1').valueChanges();
    }

    ngOnInit() {

        this.myForm = this.fb.group({
            email: ['', Validators.required],
            message: ['', Validators.required]
        });

    }

    async submitHandler() {
        this.loading = true;

        const formValue = this.myForm.value;

        console.log(formValue);

        try {
            await this.db.collection('contacts').add(formValue);
            this.success = true;
        } catch(err) {
            console.error(err)
        }

        this.loading = false;
    }

}
