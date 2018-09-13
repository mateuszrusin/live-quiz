import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatButtonModule, MatDialogModule, MatCardModule } from '@angular/material';
import { QRCodeComponent } from './dialog/qrcode/qrcode.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        QRCodeModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ConfirmComponent,
        QRCodeComponent,
    ],
    entryComponents: [
        ConfirmComponent,
        QRCodeComponent,
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ConfirmComponent,
        QRCodeComponent,
    ],
    providers: [
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
    ]
})
export class ComponentsModule { }
