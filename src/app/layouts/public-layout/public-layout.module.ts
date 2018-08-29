import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PublicComponent } from '../../components/public/public/public.component';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, } from '@angular/material';
import { RouterModule } from '@angular/router';
import { PublicLayoutRoutes } from './public-layout.routing';
import { QRCodeModule } from 'angularx-qrcode';
import {LoginComponent} from '../../components/public/login/login.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(PublicLayoutRoutes),
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        QRCodeModule
    ],
    declarations: [
        PublicComponent,
        LoginComponent,
    ]
})

export class PublicLayoutModule {
}
