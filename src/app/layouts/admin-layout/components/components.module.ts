import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
        MatButtonModule,
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ConfirmComponent,
    ],
    entryComponents: [
        ConfirmComponent
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ConfirmComponent,
    ],
    providers: [
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
    ]
})
export class ComponentsModule { }
