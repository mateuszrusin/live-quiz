import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule, MatCardModule, MatSortModule,
} from '@angular/material';
import {QuizComponent} from '../../pages/quiz/quiz.component';
import {CdkTableModule} from '@angular/cdk/table';
import {AngularFirestore} from 'angularfire2/firestore';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        ReactiveFormsModule,
        FormsModule,
        CdkTableModule,
        MatButtonModule,
        MatRippleModule,
        MatInputModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatTableModule,
        MatCardModule,
        MatSortModule
    ],
    declarations: [
        DashboardComponent,
        QuizComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        UpgradeComponent,
    ],
    providers: [
        AngularFirestore,
    ],
})

export class AdminLayoutModule {
}
