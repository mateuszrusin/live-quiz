import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PublicComponent } from '../../components/public/public/public.component';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { PublicLayoutRoutes } from './public-layout.routing';
import { QRCodeModule } from 'angularx-qrcode';
import {LoginComponent} from '../../components/public/login/login.component';
import {LogoutComponent} from '../../components/public/logout/logout.component';

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
        MatSnackBarModule,
        QRCodeModule
    ],
    declarations: [
        PublicComponent,
        LoginComponent,
        LogoutComponent,
    ]
})

export class PublicLayoutModule {
}
