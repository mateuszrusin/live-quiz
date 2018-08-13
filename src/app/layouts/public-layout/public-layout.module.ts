import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicComponent } from '../../components/public/public/public.component';


import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../../environments/environment';

import { MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, } from '@angular/material';
import { RouterModule } from '@angular/router';
import { PublicLayoutRoutes } from './public-layout.routing';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(PublicLayoutRoutes),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        QRCodeModule
    ],
    providers: [
        AngularFirestore,
    ],
    declarations: [
        PublicComponent,
    ]
})

export class PublicLayoutModule {
}
